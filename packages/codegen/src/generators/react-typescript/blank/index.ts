import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import path from "path";
import { blankQuestions } from "./answers";
import { deriveBlankTemplateModel } from "./template-model";
import { amplicodeComponentOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";
import {writeBlank} from "./write";

export class Blank extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      questions: blankQuestions,
      stages: {
        deriveTemplateModel: deriveBlankTemplateModel,
        write: writeBlank
      }
    }, this);
  }
}

const description = 'Empty screen template.';
const icon = 'blank.svg'
const index = 3;

export {
  Blank as generator,
  amplicodeComponentOptionsConfig as options,
  blankQuestions as params,
  description,
  icon,
  index
};
