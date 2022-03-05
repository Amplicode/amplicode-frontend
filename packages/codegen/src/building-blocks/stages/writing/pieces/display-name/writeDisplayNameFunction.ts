import fs from 'fs';
import path from "path";
import {YeomanGenerator} from "../../../../YeomanGenerator";
import {templateUtilities, UtilTemplateModel} from "../../../template-model/pieces/util";

export interface WriteDisplayNameInput {
  gen: YeomanGenerator;
  entityName: string;
  /**
   * All attributes - based on schema, not on query
   */
  attributes: string[];
  dirShift?: string;
  idAttrName?: string;
}

export async function writeDisplayNameFunction({gen, entityName, attributes, dirShift, idAttrName = 'id'}: WriteDisplayNameInput) {
  const functionPath = getFunctionPath(entityName, gen.destinationPath(), dirShift);

  if (fs.existsSync(functionPath)) {
    return;
  }

  const templatePath = path.resolve(__dirname, 'template/DisplayNameFunction.ejs');
  const templateModel: DisplayNameFunctionTemplateModel = {
    attributes,
    entityName,
    idAttrName,
    ...templateUtilities
  };

  await gen.fs.copyTpl(templatePath, functionPath, templateModel);
}

interface DisplayNameFunctionTemplateModel extends UtilTemplateModel {
  attributes: string[];
  idAttrName: string;
  entityName: string;
}

function getFunctionPath(entityName: string, componentDestPath: string, dirShift?: string) {
  return path.join(
    componentDestPath,
    dirShift ?? '',
    'core', 'display-name',
    getFunctionName(entityName) + '.ts'
  );
}

function getFunctionName(entityName: string): string {
  const capitalizedEntityName = entityName[0].toUpperCase() + entityName.slice(1);

  return `get${capitalizedEntityName}DisplayName`;
}