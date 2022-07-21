import {YeomanGenerator} from "../../../../YeomanGenerator";

export async function writeFile(gen: YeomanGenerator, filePath: string, output: string) {
  const fullFilePath = gen.destinationPath(filePath);
  await gen.fs.write(fullFilePath, output);
}