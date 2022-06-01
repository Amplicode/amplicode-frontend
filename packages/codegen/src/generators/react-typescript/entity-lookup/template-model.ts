import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
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
import {EntityLookupAnswers} from "./answers";

export interface EntityLookupTemplateModel extends
  BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel {
  queryName: string,
  route: string,
  queryString: string,
  idField: string,
  attributes: AttributeModel[];
  allAttributes: string[];
  entityName: string;
}

export const deriveEntityLookupTemplateModel: AmplicodeTemplateModelStage<AmplicodeComponentOptions, EntityLookupAnswers, EntityLookupTemplateModel> = async (
  options: AmplicodeComponentOptions, answers: EntityLookupAnswers, schema?: GraphQLSchema
): Promise<EntityLookupTemplateModel> => {
  if (schema == null) {
    throw new Error('Schema not found');
  }

  const {
    componentName,
    route,
    query: queryString,
    idField = 'id',
  } = answers;

  const queryNode = gql(queryString);
  const queryName = getTopFieldName(queryNode);
  const attributes = getEntityAttributes(queryNode, schema, idField);
  const entityName = getEntityName(queryName, schema);
  const allAttributes = getAttributeNames(entityName, schema);

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers, schema),
    componentName,
    route,
    queryName,
    queryString,
    attributes,
    allAttributes,
    idField,
    entityName
  };
};



