import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeAmplicodeComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import {MvpEntityEditorTemplateModel} from "./template-model";
import path from "path";
import {writeDisplayNameFunctionsForRelations} from "../../../building-blocks/stages/writing/pieces/display-name/writeDisplayNameFunctionsForRelations";

export async function writeEntityDetails(
  templateModel: MvpEntityEditorTemplateModel, gen: YeomanGenerator
) {
  if (templateModel.mutationName != null && templateModel.mutationString != null) {
    await writeAmplicodeComponent(templateModel, gen, path.join(__dirname, 'template', 'EntityEditor.tsx.ejs'));
    return;
  }

  await writeAmplicodeComponent(templateModel, gen, path.join(__dirname, 'template', 'EntityDetails.tsx.ejs'));

  await writeDisplayNameFunctionsForRelations(gen, templateModel.attributes, templateModel.relDirShift);
}