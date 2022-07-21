import {YeomanGenerator} from "../../../../../YeomanGenerator";
import j, {Collection} from "jscodeshift";

export async function removeVarExportInFile(gen: YeomanGenerator, file: string, variableName: string) {
  const filePath = gen.destinationPath(file);
  const source = gen.fs.read(filePath);
  const tsParser = j.withParser('ts');
  const ast = tsParser(source);

  removeVarExport(ast, variableName);

  const output = ast.toSource();
  await gen.fs.write(filePath, output);
}

export function removeVarExport(ast: Collection, variableName: string) {
  ast.find(j.ExportNamedDeclaration, (node) => node?.declaration?.declarations?.[0]?.id?.name === variableName)
    .remove();
}