import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {EntityListTemplateModel} from "./template-model";
import {writeAmplicodeComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import path from "path";
import {writeDisplayNameFunction} from "../../../building-blocks/stages/writing/pieces/display-name/writeDisplayNameFunction";
import {writeDisplayNameFunctionsForRelations} from "../../../building-blocks/stages/writing/pieces/display-name/writeDisplayNameFunctionsForRelations";

export async function writeEntityList(
  templateModel: EntityListTemplateModel, gen: YeomanGenerator
) {
  // Write screen component
  await writeAmplicodeComponent(templateModel, gen, path.join(__dirname, '..', 'common', 'template', 'Cards.tsx.ejs'));

  // Write getXXXDisplayName() function for listed entity
  await writeDisplayNameFunction({
    gen,
    entityName: templateModel.entityName,
    attributes: templateModel.allAttributes,
    dirShift: templateModel.relDirShift,
    idAttrName: templateModel.idField
  });

  await writeDisplayNameFunctionsForRelations(gen, templateModel.attributes, templateModel.relDirShift);
}
