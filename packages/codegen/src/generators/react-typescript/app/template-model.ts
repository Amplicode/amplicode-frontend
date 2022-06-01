import {AppAnswers} from "./answers";
import { AmplicodeCommonOptions } from "../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema, printSchema} from "graphql";

export interface AppTemplateModel extends AppAnswers {
  schema?: string;
  generatorVersion: string;
}

export const deriveTemplateModel = async (
  options: AmplicodeCommonOptions,
  answers: AppAnswers,
  schema?: GraphQLSchema,
): Promise<AppTemplateModel> => {

  const {portNumber = '8080', ...appAnswers} = answers;

  return {
    ...appAnswers,
    portNumber,
    schema: schema ? printSchema(schema, { commentDescriptions: true }) : undefined,
    generatorVersion: require('../../../../package.json').version,
  };
}
