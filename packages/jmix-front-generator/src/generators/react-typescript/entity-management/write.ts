import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {addEntityMenuItem} from "../../../building-blocks/stages/writing/pieces/menu";
import {
  writeEditorComponent,
  writeListComponent,
  writeManagementComponent
} from "../../../building-blocks/stages/writing/pieces/entity-management/entity-management";
import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import * as entityManagementEn from "../../../building-blocks/stages/writing/pieces/entity-management/entity-management-en.json";
import * as entityManagementFr from "../../../building-blocks/stages/writing/pieces/entity-management/entity-management-fr.json";
import * as entityManagementRu from "../../../building-blocks/stages/writing/pieces/entity-management/entity-management-ru.json";
import {addComponentPreviews} from "../../../building-blocks/stages/writing/pieces/previews-registration";


export const write: WriteStage<Options, TemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {
    className, 
    nameLiteral,
    editComponentClass,
    listComponentClass,
    listType
  } = templateModel;

  const extension = '.tsx.ejs';

  writeManagementComponent(gen, extension, templateModel);
  writeListComponent(gen, extension, templateModel);
  writeEditorComponent(gen, extension, templateModel);
  writeComponentI18nMessages(
    gen.fs,
    className,
    options.dirShift,
    projectModel.project?.locales,
    {
      en: entityManagementEn,
      fr: entityManagementFr,
      ru: entityManagementRu
    }
  );

  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, editComponentClass, editComponentClass, true, {entityId: 'new'});
  addComponentPreviews(gen, dirShift, listComponentClass, listComponentClass, true, generateMockProps(listType));
};

function generateMockProps(listType: string): any {
  if(listType === "table") {
    return null;
  }

  return {
    paginationConfig: {},
    onPagingChange: () => {}
  }
}
