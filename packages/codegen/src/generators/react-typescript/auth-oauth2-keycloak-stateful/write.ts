import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {EmptyTemplateModel} from "../../../building-blocks/stages/template-model/pieces/EmptyTemplateModel";
import {writeTemplate} from "../../../building-blocks/stages/writing/pieces/writeTemplate";
import {replaceEnvVarValueInFile} from "../../../building-blocks/stages/writing/pieces/replace/replaceEnvVarValue";
import {replaceStringValueInFile} from "../../../building-blocks/stages/writing/pieces/replace/replaceStringValue";

export async function write_Auth_OAuth2_Keycloak_Stateful(
  _templateModel: EmptyTemplateModel, gen: YeomanGenerator
) {
  await writeTemplate(gen, './Login.tsx', './src/app/login/Login.tsx');
  await writeTemplate(gen, './security.ts', './src/core/security/security.ts');

  await replaceStringValueInFile(gen, './src/config.ts', 'LOGIN_URI', '/oauth2/authorize');
  await replaceStringValueInFile(gen, './vite.config.ts', 'LOGIN_BASE_URL', 'oauth2');

  await replaceEnvVarValueInFile( gen, '.env.development', 'VITE_LOGIN_URI', '/oauth2/authorize');
  await replaceEnvVarValueInFile(gen, '.env.production', 'VITE_LOGIN_URI', '/oauth2/authorize');
}
