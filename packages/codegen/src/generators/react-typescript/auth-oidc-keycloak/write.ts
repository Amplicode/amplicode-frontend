import {EmptyTemplateModel} from "../../../building-blocks/stages/template-model/pieces/EmptyTemplateModel";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {resetAuth} from "../../../building-blocks/stages/writing/pieces/auth/resetAuth";
import {writeTemplate} from "../../../building-blocks/stages/writing/pieces/writeTemplate";

export async function writeAuthOidcKeycloak(
  _templateModel: EmptyTemplateModel, gen: YeomanGenerator
) {
  await resetAuth(gen);

  await writeTemplate(gen);



  await gen.npmInstall(['oidc-client-ts', 'react-oidc-context']);
}