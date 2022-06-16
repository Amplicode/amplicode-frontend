import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {EntityListMode, EntityListAnswers, EntityListType} from "./answers";
import {getNamedType, GraphQLEnumType, GraphQLList, GraphQLSchema} from "graphql";
import gql from "graphql-tag";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";
import {AttributeModel} from "../../../building-blocks/stages/template-model/pieces/entity";
import {getEntityAttributes} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getEntityAttributes";
import {getEntityName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getEntityName";
import {getAttributeNames} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getAttributeNames";
import {getTopFieldName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getTopFieldName";
import {getOperationDefinitionName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getOperationDefinitionName";
import { getGraphQLTypeByArgumentName } from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getGraphQLTypeByArgumentName";
import { capitalizeFirst, splitByCapitalLetter } from "../../../common/utils";
import { deriveUsingScalars, UsingScalars } from "../entity-details/template-model";
import { isAnyLeafType } from "../../../building-blocks/stages/template-model/pieces/graphql-utils/isAnyLeafType";


export interface EntityListTemplateModel extends
  BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel, FiltersTemplateModel {
  queryName: string,
  route: string,
  queryString: string,
  deleteMutationName?: string,
  deleteMutationString?: string,
  idField: string,
  type: EntityListType;
  multiselect: boolean;
  mode: EntityListMode;
  attributes: AttributeModel[];
  allAttributes: string[];
  itemComponentName?: string;
  refetchQuery: string;
  entityName: string;
}

export const deriveEntityListTemplateModel: AmplicodeTemplateModelStage<AmplicodeComponentOptions, EntityListAnswers, EntityListTemplateModel> = async (
  options: AmplicodeComponentOptions, answers: EntityListAnswers, schema?: GraphQLSchema
): Promise<EntityListTemplateModel> => {
  if (schema == null) {
    throw new Error('Schema not found');
  }

  const {
    componentName,
    route,
    query: queryString,
    mutation: deleteMutationString,
    type = 'cards',
    multiselect = false,
    mode = 'edit',
    idField = 'id',
    filterByArguments
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = deleteMutationString != null ? gql(deleteMutationString) : undefined;
  const queryName = getTopFieldName(queryNode);
  const refetchQuery = getOperationDefinitionName(queryNode);
  const deleteMutationName = mutationNode != null ? getTopFieldName(mutationNode) : undefined;
  const attributes = getEntityAttributes(queryNode, schema, idField);
  const entityName = getEntityName(queryName, schema);
  const allAttributes = getAttributeNames(entityName, schema);

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers, schema),
    ...deriveFiltersTemplateModel(queryName, filterByArguments, schema),
    componentName,
    route,
    queryName,
    queryString,
    deleteMutationName,
    deleteMutationString,
    attributes,
    allAttributes,
    idField,
    type,
    multiselect,
    mode,
    refetchQuery,
    entityName
  };
};

export interface FiltersTemplateModel {
  filters: AttributeModel[];
  withFilters: boolean;
  hiddenFilters: AttributeModel[];
  withHiddenFilters: boolean;
  maxFiltersInRow: number;
  filterUsingScalars: UsingScalars;
}
export function deriveFiltersTemplateModel(queryName: string, filterByArguments: Array<string[]>, schema?: GraphQLSchema): FiltersTemplateModel {
  let filters: AttributeModel[] = [];
  if (filterByArguments != null) {
    if (schema == null) throw new Error('Schema is required for generating filters');

    const listQueryType = schema.getQueryType()?.getFields()[queryName];
    if (listQueryType == null) throw new Error('Can\'t find query name in the schema for generating filters');

    filters = filterByArguments.map(argumentName => {
      const gqlType = getGraphQLTypeByArgumentName(schema, listQueryType, argumentName);
      const type = getNamedType(gqlType).toString();

      return {
        name: argumentName.length === 1 ? argumentName[0] : argumentName,
        displayName: getFilterCaption(argumentName),
        type,
        gqlType,
        enumOptions: gqlType instanceof GraphQLEnumType
          ? gqlType.getValues()
          : undefined,
        isSingleRelationField: !isAnyLeafType(gqlType) && !(gqlType instanceof GraphQLList),
        isMultiRelationField: !isAnyLeafType(gqlType) && gqlType instanceof GraphQLList,
        nestedAttributes: isAnyLeafType(gqlType)
          ? undefined
          : getAttributeNames(type, schema),
      }
    })
  }
  const withFilters = filters.length > 0;

  const filterUsingScalars = deriveUsingScalars(filters);


  const maxFiltersInRow = 4;
  const hiddenFilters = filters.filter((_, index) => index >= maxFiltersInRow);
  const withHiddenFilters = hiddenFilters.length > 0;

  return {
    filterUsingScalars,
    filters,
    withFilters,
    hiddenFilters,
    withHiddenFilters,
    maxFiltersInRow,
  }
}

function getFilterCaption(argumentName: string[]) {
  return removeFirstFilterPathString(argumentName)
    .map(argumentNameElem => capitalizeFirst(splitByCapitalLetter(argumentNameElem)))
    .join(' ');
}

function removeFirstFilterPathString(argumentName: string[]) {
  if(argumentName[0] === 'filter' && argumentName.length > 1) {
    const [, ...tail] = argumentName;
    return tail;
  }
  return argumentName;
}
