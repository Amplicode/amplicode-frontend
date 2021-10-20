import {GraphQLSchema} from "graphql";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import { AmplicodeCommonOptions } from "../options/pieces/amplicode";

export const amplicodeDeriveTemplateModel = async <O extends AmplicodeCommonOptions, A, T>(
  options: O,
  answers: A,
  _schema?: GraphQLSchema,
  _questions?: StudioTemplateProperty[]
): Promise<T> => {
  return answers as unknown as T;
}
