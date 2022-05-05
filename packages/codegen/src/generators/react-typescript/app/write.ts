import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {amplicodeWrite} from "../../../building-blocks/stages/writing/amplicodeWrite"
import { AppTemplateModel } from "./template-model";
import {writeGraphQLSchema} from "../common/writeGraphQLSchema";

export async function writeApp(
  templateModel: AppTemplateModel, gen: YeomanGenerator
) {
  amplicodeWrite(templateModel, gen);
  gen.fs.move(gen.destinationPath('_gitignore'), gen.destinationPath('.gitignore'));

  writeGraphQLSchema(gen, templateModel);
}
