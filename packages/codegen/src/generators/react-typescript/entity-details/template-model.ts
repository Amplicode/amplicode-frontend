import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {MvpEntityEditorAnswers} from "./answers";
import {
  DocumentNode,
  GraphQLEnumType, GraphQLInputObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
  GraphQLField,
} from "graphql";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import gql from "graphql-tag";
import {GraphQLOutputType} from "graphql/type/definition";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {getEntityAttributes} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getEntityAttributes";
import {getEntityName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getEntityName";
import {AttributeModel} from "../../../building-blocks/stages/template-model/pieces/entity";
import {getTopFieldName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getTopFieldName";

export interface MvpEntityEditorTemplateModel extends BaseTemplateModel, ScreenTemplateModel, UtilTemplateModel, GraphQLEditorModel {
  queryString: string,
  mutationString?: string,
  idField: string,
  refetchQueryName: string,
}

type GraphQLEditorModel = {
  queryName: string,
  mutationName?: string,
  entityName?: string,
  attributes: AttributeModel[],
  inputVariableName?: string;
  inputTypeName?: string;

  // We need these in order to have correct imports in the templates
  hasStringScalars?: boolean;
  hasIntScalars?: boolean;
  hasFloatScalars?: boolean;
  hasIDScalars?: boolean;
  hasBooleanScalars?: boolean;
  hasEnumScalars?: boolean;
  hasUnknownCustomScalars?: boolean;
  hasRelationFields?: boolean;

  hasDateScalars?: boolean;
  hasTimeScalars?: boolean;
};

export const deriveEntityDetailsTemplateModel: AmplicodeTemplateModelStage<
  AmplicodeComponentOptions, MvpEntityEditorAnswers, MvpEntityEditorTemplateModel
> = async (
  options: AmplicodeComponentOptions,
  answers: MvpEntityEditorAnswers,
  schema?: GraphQLSchema,
): Promise<MvpEntityEditorTemplateModel>  => {
  const {
    query: queryString,
    mutation: mutationString,
    idField = 'id',
    refetchQueryName
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = mutationString != null
    ? gql(mutationString)
    : undefined;

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers, schema),
    ...deriveGraphQLEditorModel(queryNode, idField, schema, mutationNode),
    // TODO problem with $id: String = "", quotation marks get messed up
    queryString,
    mutationString,
    idField,
    refetchQueryName
  }
};

export function deriveGraphQLEditorModel(
  queryNode: DocumentNode,
  idField: string,
  schema?: GraphQLSchema,
  mutationNode?: DocumentNode,
): GraphQLEditorModel {
  if (schema == null) {
    throw new Error('Schema is required for this generator');
  }

  const queryName = getTopFieldName(queryNode);
  const entityName = getEntityName(queryName, schema);

  if (mutationNode == null) {
    const readOnlyAttributes = getEntityAttributes(queryNode, schema, idField);

    return {
      queryName,
      attributes: readOnlyAttributes,
      entityName
    }
  }

  const operationDefinition = mutationNode.definitions[0];
  if (!('variableDefinitions' in operationDefinition) || operationDefinition.variableDefinitions == null) {
    throw new Error('Variable definitions not found in mutation');
  }

  const inputVariableName = operationDefinition.variableDefinitions[0].variable.name.value;

  const inputType = operationDefinition.variableDefinitions[0].type;

  let inputTypeName: string | undefined;
  if ('name' in inputType) {
    inputTypeName = inputType.name.value;
  }
  if ('type' in inputType && 'name' in inputType.type) {
    inputTypeName = inputType.type.name.value;
  }
  if (inputTypeName == null) {
    throw new Error('Input type name not found');
  }

  const mutationName = getTopFieldName(mutationNode);

  const queryType = schema.getQueryType();
  if (queryType == null) {
    throw new Error('Query type not found');
  }

  const outputType: GraphQLOutputType = queryType.getFields()[queryName].type;
  if (!('name' in outputType)) {
    throw new Error('Output type name not found');
  }

  const typeMap = schema.getTypeMap();
  if (typeMap == null) {
    throw new Error('Type map not found');
  }

  const namedType = typeMap[inputTypeName];

  if (namedType == null
    || namedType instanceof GraphQLScalarType
    || namedType instanceof GraphQLUnionType
    || namedType instanceof GraphQLEnumType
  ) {
    throw new Error(`Unexpected type ${namedType}`);
  }

  let hasStringScalars: boolean = false;
  let hasIntScalars: boolean = false;
  let hasFloatScalars: boolean = false;
  const hasIDScalars: boolean = false;
  let hasBooleanScalars: boolean = false;
  let hasEnumScalars: boolean = false;
  let hasUnknownCustomScalars: boolean = false;
  let hasRelationFields: boolean = false;

  let hasDateScalars: boolean = false;
  let hasTimeScalars: boolean = false;

  // We take attributes from query, otherwise it won't be possible to pair the entity type from editor with entity type from list
  const attributes = getEntityAttributes(queryNode, schema, idField);

  // We need to take some info from mutation input and add it to `attributes`
  Object.values(namedType.getFields()).map((field: GraphQLField<any, any>) => {
    const attr = attributes.find(a => a.name === field.name);

    if (attr == null) {
      return;
    }

    switch (attr.type) {
      case 'Int':
      case 'ID':
      case 'BigInteger':
      case 'BigDecimal':
      case 'Long':
        hasIntScalars = true;
        break;
      case 'Float':
        hasFloatScalars = true;
        break;
      case 'String':
        hasStringScalars = true;
        break;
      case 'Boolean':
        hasBooleanScalars = true;
        break;
      case 'Date':
      case 'DateTime':
      case 'LocalDateTime':
      case 'Timestamp':
        hasDateScalars = true;
        break;
      case 'Time':
      case 'LocalTime':
        hasTimeScalars = true;
        break;

      default:
        if (field.type instanceof GraphQLEnumType) {
          attr.enumOptions = field.type.getValues();
          hasEnumScalars = true;
          break;
        }
        if (field.type instanceof GraphQLInputObjectType) {
          attr.isRelationField = true;
          hasRelationFields = true;
          break;
        }
        if (field.type instanceof GraphQLScalarType) {
          hasUnknownCustomScalars = true;
        }
    }
  });

  return {
    queryName,
    mutationName,
    attributes,
    entityName,
    hasStringScalars,
    hasIntScalars,
    hasFloatScalars,
    hasIDScalars,
    hasBooleanScalars,
    hasEnumScalars,
    hasUnknownCustomScalars,
    hasRelationFields,
    hasDateScalars,
    hasTimeScalars,
    inputVariableName,
    inputTypeName
  };
}
