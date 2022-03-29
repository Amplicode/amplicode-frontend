import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeAmplicodeComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import {writeDisplayNameFunction} from "../../../building-blocks/stages/writing/pieces/display-name/writeDisplayNameFunction";
import {writeDisplayNameFunctionsForRelations} from "../../../building-blocks/stages/writing/pieces/display-name/writeDisplayNameFunctionsForRelations";
import {EntityLookupTemplateModel} from "./template-model";
import path from "path";

export async function writeEntityLookup(
  templateModel: EntityLookupTemplateModel, gen: YeomanGenerator
) {

  // Write screen component
  await writeAmplicodeComponent(templateModel, gen, path.join(__dirname, 'template', 'Lookup.tsx.ejs'));

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
