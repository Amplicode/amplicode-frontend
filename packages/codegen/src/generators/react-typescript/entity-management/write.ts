import {EntityManagementTemplateModel} from "./template-model";
import { writeEntityDetails} from '../entity-details/write';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {writeEntityList} from "../entity-list/write";
import path from "path";
import {addMvpAppMenu} from "../../../building-blocks/stages/writing/pieces/mvp/addMvpAppMenu";

export async function writeManagement(
  templateModel: EntityManagementTemplateModel, gen: YeomanGenerator
)  {
  gen.log('Writing ScreenLayout...');
  await writeScreenLayout(templateModel, gen);

  gen.log(`Writing EntityDetails/Editor (${templateModel.entityListTemplateModel.mode})...`);
  await writeEntityDetails(templateModel.entityDetailsTemplateModel, gen);

  gen.log(`Writing EntityList (${templateModel.entityListTemplateModel.type})...`);
  await writeEntityList(templateModel.entityListTemplateModel, gen);
}

function writeScreenLayout(templateModel: EntityManagementTemplateModel, gen: YeomanGenerator) {
  const srcPath = path.join(__dirname, 'template', 'ScreenLayout.tsx.ejs');

  const {
    relDirShift,
    componentName,
    route,
    shouldAddToMenu,
    menuItemName
  } = templateModel;

  gen.log(`Generating to ${gen.destinationPath()}`);

  gen.fs.copyTpl(
    srcPath,
    gen.destinationPath(componentName + '.tsx'),
    templateModel
  );

  gen.log(`✓ Component ${componentName} written`);

  if (shouldAddToMenu) {
    addMvpAppMenu({
      gen,
      dirShift: relDirShift,
      route,
      componentName,
      menuItemName
    });
  } else {
    gen.log(`✓ Menu item not required for ${componentName}`);
  }
}