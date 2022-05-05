import {AppAnswers} from "./answers";
import { AmplicodeCommonOptions } from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema, printSchema} from "graphql";

export interface AppTemplateModel extends AppAnswers {
  schemaPath?: string
  schema?: string
  generatorVersion: string;
}

export const deriveTemplateModel = async (
  options: AmplicodeCommonOptions,
  answers: AppAnswers,
  schema?: GraphQLSchema,
  schemaPath?: string
): Promise<AppTemplateModel> => {
  return {
    ...answers,
    schemaPath: schemaPath?.replace(/\\/g, "/"),
    schema: schema ? printSchema(schema, { commentDescriptions: true }) : undefined,
    generatorVersion: require('../../../../package.json').version,
  };
}
