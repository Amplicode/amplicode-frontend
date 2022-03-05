import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {EntityListMode, EntityListAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
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

export interface EntityListTemplateModel extends
  BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel {
  queryName: string,
  route: string,
  queryString: string,
  deleteMutationName?: string,
  deleteMutationString?: string,
  idField: string,
  mode: EntityListMode;
  attributes: AttributeModel[];
  allAttributes: string[];
  itemComponentName?: string;
  refetchQuery: string;
  entityName: string;
}

export const deriveEntityListTemplateModel: AmplicodeTemplateModelStage<AmplicodeComponentOptions, EntityListAnswers, EntityListTemplateModel> = async (
  options: AmplicodeComponentOptions, answers: EntityListAnswers, schema?: GraphQLSchema, _schemaPath?: string
): Promise<EntityListTemplateModel> => {
  if (schema == null) {
    throw new Error('Schema not found');
  }

  const {
    componentName,
    route,
    query: queryString,
    mutation: deleteMutationString,
    mode = 'edit',
    idField = 'id',
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = deleteMutationString != null ? gql(deleteMutationString) : undefined;
  const queryName = getTopFieldName(queryNode);
  const refetchQuery = getOperationDefinitionName(queryNode);
  const deleteMutationName = mutationNode != null ? getTopFieldName(mutationNode) : undefined;
  const attributes = getEntityAttributes(queryNode, schema);
  const entityName = getEntityName(queryName, schema);
  const allAttributes = getAttributeNames(entityName, schema);

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers),
    componentName,
    route,
    queryName,
    queryString,
    deleteMutationName,
    deleteMutationString,
    attributes,
    allAttributes,
    idField,
    mode,
    refetchQuery,
    entityName
  };
};



