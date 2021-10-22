import {EntityListTemplateModel, deriveEntityListTemplateModel} from "../entity-list/template-model";
import {MvpEntityEditorTemplateModel, deriveEntityDetailsTemplateModel} from "../entity-details/template-model";
import {EntityManagementAnswers} from "./answers";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema} from "graphql";

export interface EntityManagementTemplateModel {
  entityListTemplateModel: EntityListTemplateModel,
  entityDetailsTemplateModel: MvpEntityEditorTemplateModel,
}

export const deriveManagementTemplateModel = async (
  options: AmplicodeComponentOptions,
  answers: EntityManagementAnswers,
  schema?: GraphQLSchema
): Promise<EntityManagementTemplateModel> => {

  const {
    listComponentName,
    detailsComponentName,
    listQueryName,
    listQuery,
    detailsQuery,
    mutation,
    deleteMutation,
    listShouldAddToMenu,
    detailsShouldAddToMenu,
    mode = 'edit',
    idField = 'id',
  } = answers

  const entityListTemplateModel = await deriveEntityListTemplateModel(
    options, {
    componentName: listComponentName,
    query: listQuery,
    mutation: deleteMutation,
    mode: mode,
    idField: idField,
    shouldAddToMenu: listShouldAddToMenu},
    schema
  );

  const entityDetailsTemplateModel = await deriveEntityDetailsTemplateModel(
    options, {
    componentName: detailsComponentName,
    query: detailsQuery,
    mutation: mutation,
    shouldAddToMenu: detailsShouldAddToMenu,
      listQueryName: listQueryName},
    schema
  )

  return {
    entityListTemplateModel,
    entityDetailsTemplateModel
  }
};
