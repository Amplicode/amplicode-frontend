import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {templateUtilities} from "../../../building-blocks/stages/template-model/pieces/util";
import {GraphQLSchema, printSchema} from "graphql";
import {AmplicodeCommonOptions} from "../../../building-blocks/stages/options/pieces/amplicode";

export interface UpdateSchemaTemplateModel extends BaseTemplateModel {
  schema: string;
}

export async function deriveUpdateSchemaTemplateModel(
  options: AmplicodeCommonOptions,
  answers: {},
  schema?: GraphQLSchema,
) {
  if (schema == null) {
    throw new Error('Schema is not provided');
  }

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    schema: printSchema(schema, { commentDescriptions: true })
  }
}