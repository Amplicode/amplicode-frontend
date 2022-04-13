import {AppAnswers} from "./answers";
import { AmplicodeCommonOptions } from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema, printSchema} from "graphql";

export type AppTemplateModel = AppAnswers & {
  schemaPath?: string
  typeDefs?: string
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
    // TODO: For now the whole schema is bundled. We should only bundle type defs.
    typeDefs: schema ? printSchema(schema, { commentDescriptions: true }) : undefined
  };
}
