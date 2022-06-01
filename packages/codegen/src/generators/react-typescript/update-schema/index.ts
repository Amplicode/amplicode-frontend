import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import path from "path";
import {writeSchema} from "./write";
import {deriveUpdateSchemaTemplateModel} from "./template-model";
import { amplicodeCommonOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";

export class UpdateSchemaGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        deriveTemplateModel: deriveUpdateSchemaTemplateModel,
        write: writeSchema
      }
    }, this);
  }
}

export {
  UpdateSchemaGenerator as generator,
  amplicodeCommonOptionsConfig as options,
};