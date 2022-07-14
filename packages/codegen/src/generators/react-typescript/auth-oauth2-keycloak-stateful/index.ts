import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {amplicodePipeline} from "../../../building-blocks/pipelines/amplicodePipeline";
import path from "path";
import { amplicodeCommonOptionsConfig } from "../../../building-blocks/stages/options/pieces/amplicode";
import {write_Auth_OAuth2_Keycloak_Stateful} from "./write";

export class Auth_OAuth2_Keycloak_Stateful extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        write: write_Auth_OAuth2_Keycloak_Stateful
      }
    }, this);
  }
}

const description = 'OAuth2.0 with Keycloak (Stateful)';
const isFrontendComponent = false;

export {
  Auth_OAuth2_Keycloak_Stateful as generator,
  amplicodeCommonOptionsConfig as options,
  description,
  isFrontendComponent,
};
