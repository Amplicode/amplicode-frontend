import {YeomanGenerator} from "../../../../../YeomanGenerator";

export async function addEnvVarInFile(gen: YeomanGenerator, fileName: string, variableName: string, value: string) {
  const filePath = gen.destinationPath(fileName);
  const source = gen.fs.read(filePath);
  const output = addEnvVar(source, variableName, value);
  await gen.fs.write(filePath, output);
}

export function addEnvVar(source: string, variableName: string, value: string) {
  return `${source}\n${variableName}=${value}`;
}