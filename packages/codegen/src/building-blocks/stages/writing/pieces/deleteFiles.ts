import {YeomanGenerator} from "../../../YeomanGenerator";

export async function deleteFiles(gen: YeomanGenerator, dest: string) {
  await gen.fs.delete(gen.destinationPath(dest));
}