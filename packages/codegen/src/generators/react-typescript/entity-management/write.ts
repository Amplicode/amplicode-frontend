import {EntityManagementTemplateModel} from "./template-model";
import { writeEntityDetails} from '../entity-details/write';
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import path from "path";
import {writeAmplicodeComponent} from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import {writeEntityList} from "../entity-list/write";

export async function writeManagement(
  templateModel: EntityManagementTemplateModel, gen: YeomanGenerator
)  {
  await writeEntityDetails(templateModel.entityDetailsTemplateModel, gen);
  await  writeEntityList(templateModel.entityListTemplateModel, gen);
}
