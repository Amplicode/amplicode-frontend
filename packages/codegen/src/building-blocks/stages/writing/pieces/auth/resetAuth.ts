import {YeomanGenerator} from "../../../../YeomanGenerator";
import { deleteFiles } from "../deleteFiles";
import {removeEnvVarInFile} from "../source-utils/variables/removeEnvVar";
import {replaceStringValueInFile} from "../source-utils/variables/replaceStringValue";
import {removeVarExportInFile} from "../source-utils/variables/removeVarExport";
import {uninstallNpmDeps} from "../npm/uninstallNpmDeps";
import { writeTemplate } from "../writeTemplate";

/**
 * Deletes all auth-related specifics.
 * To be used in auth-* generators in order to reset the project code to a known state
 * before modifying it.
 *
 * @param gen
 */
export async function resetAuth(gen: YeomanGenerator) {
  // Delete auth-related code:
  // - Apollo links
  await deleteFiles(gen, './src/core/apollo/links/authLink.ts');
  await deleteFiles(gen, './src/core/apollo/links/httpLink.ts');
  // - server error handling
  await deleteFiles(gen, './src/core/error/ServerErrorInterceptor.ts');
  // - security folder
  await deleteFiles(gen, './src/core/security/Auth.tsx');
  await deleteFiles(gen, './src/core/security/oidcConfig.ts');
  await deleteFiles(gen, './src/core/security/SecurityProvider.tsx');
  await deleteFiles(gen, './src/core/security/SecurityStore.ts');
  await deleteFiles(gen, './src/core/security/login');
  // - dev
  await deleteFiles(gen, './src/dev/performDevLogin.ts');

  // Remove auth-related env variables
  // - .env.development
  await removeEnvVarInFile(gen, './.env.development', 'VITE_LOGIN_URI');
  await removeEnvVarInFile(gen, './.env.development', 'VITE_LOGOUT_URI');
  await removeEnvVarInFile(gen, './.env.development', 'VITE_REQUEST_SAME_ORIGIN');
  await removeEnvVarInFile(gen, './.env.development', 'VITE_DEV_LOGIN');
  await removeEnvVarInFile(gen, './.env.development', 'VITE_DEV_PASSWORD');
  // - .env.production
  await removeEnvVarInFile(gen, './.env.production', 'VITE_LOGIN_URI');
  await removeEnvVarInFile(gen, './.env.production', 'VITE_LOGOUT_URI');
  await removeEnvVarInFile(gen, './.env.production', 'VITE_REQUEST_SAME_ORIGIN');
  await removeEnvVarInFile(gen, './.env.production', 'VITE_DEV_LOGIN');
  await removeEnvVarInFile(gen, './.env.production', 'VITE_DEV_PASSWORD');
  // - src/config.ts
  await removeVarExportInFile(gen, './src/config.ts', 'LOGIN_URI');
  await removeVarExportInFile(gen, './src/config.ts', 'LOGOUT_URI');
  await removeVarExportInFile(gen, './src/config.ts', 'REQUEST_SAME_ORIGIN');
  await removeVarExportInFile(gen, './src/config.ts', 'DEV_LOGIN');
  await removeVarExportInFile(gen, './src/config.ts', 'DEV_PASSWORD');
  // We don't touch vite-env.d.ts to simplify the process a bit

  // Reset proxy endpoints to just "graphql"
  await replaceStringValueInFile(gen, './vite.config.ts', 'AMPLICODE_ENDPOINTS', 'graphql');

  // Remove npm deps added by some auth variants
  await uninstallNpmDeps(gen, ['oidc-client-ts', 'react-oidc-context']);

  // Reset some files to defaults from ./template/**
  await writeTemplate(gen);

  await deleteFiles(gen, './src/non-existing-file'); // TODO remove
}

