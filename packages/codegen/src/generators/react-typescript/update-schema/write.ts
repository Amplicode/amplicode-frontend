import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeGraphQLSchema} from "../common/writeGraphQLSchema";
import {UpdateSchemaTemplateModel} from "./template-model";

export async function writeSchema(
  templateModel: UpdateSchemaTemplateModel, gen: YeomanGenerator
) {
  writeGraphQLSchema(gen, templateModel);
}