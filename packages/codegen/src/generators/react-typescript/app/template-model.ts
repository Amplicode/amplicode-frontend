import {AppAnswers} from "./answers";
import { AmplicodeCommonOptions } from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema, printSchema} from "graphql";

export type AppTemplateModel = AppAnswers & {
  schemaPath?: string
  schema?: string
};

export const deriveTemplateModel = async (
  options: AmplicodeCommonOptions,
  answers: AppAnswers,
  schema?: GraphQLSchema,
  schemaPath?: string
): Promise<AppTemplateModel> => {
  return {
    ... answers,
    schemaPath: schemaPath?.replace(/\\/g, "/"),
    schema: schema ? printSchema(schema, { commentDescriptions: true }) : undefined
  };
}
