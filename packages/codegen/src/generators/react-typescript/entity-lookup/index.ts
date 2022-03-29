import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import { amplicodeComponentOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import { entityLookupQuestions } from "./answers";
import {deriveEntityLookupTemplateModel} from "./template-model";
import {writeEntityLookup} from "./write";
import path from "path";

export class EntityLookupGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      questions: entityLookupQuestions,
      stages: {
        deriveTemplateModel: deriveEntityLookupTemplateModel,
        write: writeEntityLookup
      }
    }, this);
  }
}

const description = 'Set of entities displayed as cards.';
const icon = 'entity-lookup.svg'
const index = 10;

export {
  EntityLookupGenerator as generator,
  amplicodeComponentOptionsConfig as options,
  entityLookupQuestions as params,
  description,
  icon,
  index
}
