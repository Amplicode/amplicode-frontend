import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeAmplicodeComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import {BlankTemplateModel} from "./template-model";
import path from "path";

export async function writeBlank(
  templateModel: BlankTemplateModel, gen: YeomanGenerator
) {
  await writeAmplicodeComponent(templateModel, gen, path.join(__dirname, 'template', 'BlankScreen.tsx.ejs'));
}