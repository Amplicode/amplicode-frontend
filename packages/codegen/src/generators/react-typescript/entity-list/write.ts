import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {EntityListTemplateModel} from "./template-model";
import {writeAmplicodeComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import path from "path";
import {writeDisplayNameFunction} from "../../../building-blocks/stages/writing/pieces/display-name/writeDisplayNameFunction";
import {writeDisplayNameFunctionsForRelations} from "../../../building-blocks/stages/writing/pieces/display-name/writeDisplayNameFunctionsForRelations";

export async function writeEntityList(
  templateModel: EntityListTemplateModel, gen: YeomanGenerator
) {

  let templateName: string;
  switch (templateModel.type) {
    case "list":
      templateName = 'List.tsx.ejs';
      break;
    case "cards":
      templateName = 'Cards.tsx.ejs';
      break;
    case "table":
      templateName = 'Table.tsx.ejs';
      break;
    default:
      throw new Error("unexpected template type " + templateModel.type)
  }

  // Write screen component
  await writeAmplicodeComponent(templateModel, gen, path.join(__dirname, '..', 'common', 'template', templateName));

  if (templateModel.type == 'cards') {
    // Write getXXXDisplayName() function for listed entity
    await writeDisplayNameFunction({
      gen,
      entityName: templateModel.entityName,
      attributes: templateModel.allAttributes,
      dirShift: templateModel.relDirShift,
      idAttrName: templateModel.idField
    });
  }

  await writeDisplayNameFunctionsForRelations(gen, templateModel.attributes, templateModel.relDirShift);
}
