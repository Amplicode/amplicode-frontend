import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {EntityListMode, EntityListAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
import gql from "graphql-tag";
import {
  getOperationName,
  getQueryName
} from "../../../building-blocks/stages/template-model/pieces/amplicode/amplicode";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";
import {capitalizeFirst} from "../../../common/utils";
import {AttributeModel} from "../../../building-blocks/stages/template-model/pieces/entity";
import {getEntityAttributes} from "../../../building-blocks/stages/template-model/pieces/entity-management/getEntityAttributes";

export interface EntityListTemplateModel extends
  BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel {
  queryName: string,
  queryString: string,
  deleteMutationName?: string,
  deleteMutationString?: string,
  idField: string,
  mode: EntityListMode;
  attributes: AttributeModel[];
  itemComponentName?: string;
  refetchQuery: string;
}

export const deriveEntityListTemplateModel: AmplicodeTemplateModelStage<AmplicodeComponentOptions, EntityListAnswers, EntityListTemplateModel> = async (
  options: AmplicodeComponentOptions, answers: EntityListAnswers, _schema?: GraphQLSchema, _schemaPath?: string
): Promise<EntityListTemplateModel> => {
  const {
    componentName,
    query: queryString,
    mutation: deleteMutationString,
    mode = 'edit',
    idField = 'id',
  } = answers;

  const initQueryNode = gql(queryString);
  const mutationNode = deleteMutationString != null ? gql(deleteMutationString) : undefined;
  const queryTitle = getQueryName(initQueryNode)
  const queryName = getOperationName(initQueryNode);
  const renamedQueryString = queryString.replace(queryTitle, `${capitalizeFirst(queryName)}_${componentName}`)
  const queryNode = gql(renamedQueryString)
  const refetchQuery = getQueryName(queryNode);
  const deleteMutationName = mutationNode != null ? getOperationName(mutationNode) : undefined;
  const deleteMutationTitle = mutationNode != null ? getQueryName(mutationNode) : undefined;
  const renamedDeleteMutationString = deleteMutationName && deleteMutationTitle && deleteMutationString
    ? deleteMutationString.replace(deleteMutationTitle, `${capitalizeFirst(deleteMutationName)}_${componentName}`)
    : undefined
  const attributes = getEntityAttributes(queryNode, idField);

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers),
    componentName,
    queryName,
    queryString: renamedQueryString,
    deleteMutationName,
    deleteMutationString: renamedDeleteMutationString,
    attributes,
    idField,
    mode,
    refetchQuery
  };
};



