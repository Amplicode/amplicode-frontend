import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import { amplicodeCommonOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";
import path from "path";
import { writeAuthOidcKeycloak } from "./write";
import {CommonGenerationOptions} from "../../../common/cli-options";

export class AuthOidcKeycloak extends YeomanGenerator {
  constructor(args: string | string[], options: CommonGenerationOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        write: writeAuthOidcKeycloak
      }
    }, this);
  }
}

const description = 'OIDC with Keycloak (JWT)';

export {
  AuthOidcKeycloak as generator,
  amplicodeCommonOptionsConfig as options,
  description,
}