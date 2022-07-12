import {YeomanGenerator} from "../../../../YeomanGenerator";
import { ReplacementTargetNotFoundError } from "./ReplacementTargetNotFoundError";

export async function replaceEnvVarValueInFile(gen: YeomanGenerator, fileName: string, variableName: string, newValue:string) {
  const filePath = gen.destinationPath(fileName);
  const source = gen.fs.read(filePath);

  let output = source;

  try {
    output = replaceEnvVarValue(source, variableName, newValue);
  } catch (error) {
    if (error instanceof ReplacementTargetNotFoundError) {
      gen.log(`WARNING: Was trying to change ${variableName} in "${filePath}" to "${newValue}", but this file does not contain this variable. This may break the application.`);
      return;
    }
    throw error;
  }

  gen.fs.write(filePath, output);
}

export function replaceEnvVarValue(source: string, variableName: string, newValue: string): string {
  const regex = new RegExp(`^${variableName}=(.*)$`, 'm');

  if (!regex.test(source)) {
    throw new ReplacementTargetNotFoundError();
  }

  return source.replace(regex, `${variableName}=${newValue}`);
}
