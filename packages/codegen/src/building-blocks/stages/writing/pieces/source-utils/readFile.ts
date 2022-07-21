import {YeomanGenerator} from "../../../../YeomanGenerator";

export function readFile(gen: YeomanGenerator, filePath: string) {
  const fullFilePath = gen.destinationPath(filePath);
  return gen.fs.read(fullFilePath);
}