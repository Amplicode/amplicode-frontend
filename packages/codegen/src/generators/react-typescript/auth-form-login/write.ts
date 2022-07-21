import {EmptyTemplateModel} from "../../../building-blocks/stages/template-model/pieces/EmptyTemplateModel";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {resetAuth} from "../../../building-blocks/stages/writing/pieces/auth/resetAuth";
import {writeTemplate} from "../../../building-blocks/stages/writing/pieces/writeTemplate";
import {
  replaceStringValueInFile
} from "../../../building-blocks/stages/writing/pieces/source-utils/variables/replaceStringValue";
import {appendCodeInFile} from "../../../building-blocks/stages/writing/pieces/source-utils/appendCode";
import {addEnvVarInFile} from "../../../building-blocks/stages/writing/pieces/source-utils/variables/addEnvVar";

export async function writeAuthFormLogin(
  _templateModel: EmptyTemplateModel, gen: YeomanGenerator
) {
  await resetAuth(gen);
  await writeTemplate(gen);

  // Add login/logout endpoints
  await replaceStringValueInFile(gen, 'vite.config.ts', 'AMPLICODE_ENDPOINTS', 'graphql|login|logout');

  // Add environment variables
  const envVarConfig = `export const LOGIN_URI = import.meta.env.VITE_LOGIN_URI ?? "/login";
  export const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI ?? "/logout";
  export const REQUEST_SAME_ORIGIN =
    import.meta.env.VITE_REQUEST_SAME_ORIGIN ?? true;
  export const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN ?? "admin";
  export const DEV_PASSWORD = import.meta.env.VITE_DEV_PASSWORD ?? "admin";`;
  await appendCodeInFile(gen, 'src/config.ts', envVarConfig);
  for (const fileName of ['.env.development', '.env.production']) {
    await addEnvVarInFile(gen, fileName, 'VITE_LOGIN_URI', '/login');
    await addEnvVarInFile(gen, fileName, 'VITE_LOGOUT_URI', '/logout');
    await addEnvVarInFile(gen, fileName, 'VITE_REQUEST_SAME_ORIGIN', 'true');
    await addEnvVarInFile(gen, fileName, 'VITE_DEV_LOGIN', 'admin');
    await addEnvVarInFile(gen, fileName, 'VITE_DEV_PASSWORD', 'admin');
  }
}