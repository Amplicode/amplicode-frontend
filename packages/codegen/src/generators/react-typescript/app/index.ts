import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import path from "path";
import {AmplicodeCommonOptions, amplicodeCommonOptionsConfig} from "../../../building-blocks/stages/options/pieces/amplicode";
import {AppAnswers, appQuestions } from "./answers";
import { AppTemplateModel, deriveTemplateModel } from "./template-model";
import { writeApp } from "./write";

export class AppGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline<AmplicodeCommonOptions, AppAnswers, AppTemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: appQuestions,
      stages: {
        deriveTemplateModel: deriveTemplateModel,
        write: writeApp
      }
    }, this);
  }
}

const isFrontendComponent = false;

export {
  AppGenerator as generator,
  amplicodeCommonOptionsConfig as options,
  appQuestions as params,
  isFrontendComponent,
}
