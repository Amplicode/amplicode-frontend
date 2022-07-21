import {YeomanGenerator} from "../../../../YeomanGenerator";
import {readFile} from "./readFile";
import {writeFile} from "./writeFile";

export async function appendCodeInFile(gen: YeomanGenerator, filePath: string, codeToAppend: string) {
  const source = readFile(gen, filePath);
  const output = appendCode(source, codeToAppend);
  await writeFile(gen, filePath, output);
}

export function appendCode(source: string, codeToAppend: string) {
  return `${source}\n${codeToAppend}`;
}

