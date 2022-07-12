import {YeomanGenerator} from "../../../../YeomanGenerator";

export async function removeEnvVarInFile(gen: YeomanGenerator, fileName: string, variableName: string) {
  const filePath = gen.destinationPath(fileName);
  const source = gen.fs.read(filePath);

  // Doesn't do anything if it can't find the variable
  const output = removeEnvVar(source, variableName);

  gen.fs.write(filePath, output);
}

export function removeEnvVar(source: string, variableName: string) {
  const regex = new RegExp(`^${variableName}.*\n?`, 'gm');
  return source.replace(regex, '');
}