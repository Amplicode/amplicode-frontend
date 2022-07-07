import {MvpEntityEditorTemplateModel, deriveEntityDetailsTemplateModel} from "../entity-details/template-model";
import {EntityManagementAnswers} from "./answers";
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
import {deriveEntityListTemplateModel, EntityListTemplateModel} from "../entity-list/template-model";
import {getOperationDefinitionName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getOperationDefinitionName";

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
    route,
    type,
    multiselect = false,
    mode,
    listQuery,
    detailsQuery,
    upsertMutation,
    deleteMutation,
    shouldAddToMenu,
    filterByArguments,
    orderByArguments,
    paginationType,
    listIdField,
    detailsIdField
  } = answers;

  const queryNode = gql(listQuery);

  const entityDetailsTemplateModel = await deriveEntityDetailsTemplateModel(
    options, {
      componentName: itemComponentName,
      route,
      query: detailsQuery,
      mutation: upsertMutation,
      shouldAddToMenu: false,
      refetchQueryName: getOperationDefinitionName(queryNode),
      idField: detailsIdField
    },
    schema
  )

  const entityListTemplateModel = await deriveEntityListTemplateModel(
    options, {
      componentName: listComponentName,
      route,
      type,
      multiselect,
      mode,
      query: listQuery,
      mutation: deleteMutation,
      shouldAddToMenu: false,
      filterByArguments,
      orderByArguments,
      paginationType,
      idField: listIdField
    },
    schema
  );

  entityListTemplateModel.itemComponentName = itemComponentName;

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, {componentName: listComponentName + 'ScreenLayout', route, shouldAddToMenu}),
    menuItemName: listComponentName,
    entityListTemplateModel,
    entityDetailsTemplateModel
  }
};
