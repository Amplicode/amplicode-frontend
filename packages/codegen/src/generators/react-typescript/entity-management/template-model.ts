import {MvpEntityEditorTemplateModel, deriveEntityDetailsTemplateModel} from "../entity-details/template-model";
import {EntityManagementAnswers} from "./answers";
import {
  getOperationName, getQueryName,
} from "../../../building-blocks/stages/template-model/pieces/amplicode/amplicode";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema} from "graphql";
import gql from "graphql-tag";
import {
  BaseTemplateModel,
  baseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";
import {capitalizeFirst} from "../../../common/utils";
import {deriveEntityListTemplateModel, EntityListTemplateModel} from "../entity-list/template-model";

export interface EntityManagementTemplateModel extends BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel {
  entityListTemplateModel: EntityListTemplateModel;
  entityDetailsTemplateModel: MvpEntityEditorTemplateModel;
}

export const deriveManagementTemplateModel = async (
  options: AmplicodeComponentOptions,
  answers: EntityManagementAnswers,
  schema?: GraphQLSchema
): Promise<EntityManagementTemplateModel> => {

  const {
    listComponentName,
    itemComponentName,
    listQuery,
    detailsQuery,
    upsertMutation,
    deleteMutation,
    shouldAddToMenu,
  } = answers;

  const initQueryNode = gql(listQuery);
  const queryName = getOperationName(initQueryNode);
  const queryTitle = getQueryName(initQueryNode);
  const renamedQueryString = listQuery.replace(queryTitle, `${capitalizeFirst(queryName)}_${listComponentName}`)
  const queryNode = gql(renamedQueryString);

  const entityDetailsTemplateModel = await deriveEntityDetailsTemplateModel(
    options, {
      componentName: itemComponentName,
      query: detailsQuery,
      mutation: upsertMutation,
      shouldAddToMenu: false,
      refetchQueryName: getQueryName(queryNode),
    },
    schema
  )

  const entityListTemplateModel = await deriveEntityListTemplateModel(
    options, {
      componentName: listComponentName,
      query: listQuery,
      mutation: deleteMutation,
      shouldAddToMenu: shouldAddToMenu,
    },
    schema
  );

  entityListTemplateModel.itemComponentName = itemComponentName;

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, {componentName: listComponentName, shouldAddToMenu}),
    entityListTemplateModel,
    entityDetailsTemplateModel
  }
};
