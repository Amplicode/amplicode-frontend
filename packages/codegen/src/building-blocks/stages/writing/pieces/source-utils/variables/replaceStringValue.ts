import {YeomanGenerator} from "../../../../../YeomanGenerator";
import j, {Collection} from "jscodeshift";
import {ReplacementTargetNotFoundError} from "./ReplacementTargetNotFoundError";

export async function replaceStringValueInFile(
  gen: YeomanGenerator, file: string, variableName: string, newValue: string
) {
  const filePath = gen.destinationPath(file);
  const source = gen.fs.read(filePath);
  const tsParser = j.withParser('ts');
  const ast = tsParser(source);

  try {
    replaceStringValue(ast, variableName, newValue);
  } catch (error) {
    if (error instanceof ReplacementTargetNotFoundError) {
      gen.log(`WARNING: Was trying to change ${variableName} in "${file}" to ${newValue}, but this file does not contain this variable. This may break the application.`);
      return;
    }
  }

  const output = ast.toSource();
  await gen.fs.write(filePath, output);
}

export function replaceStringValue(ast: Collection, variableName: string, newValue: string) {
  const loginUriStringValue = ast
    .findVariableDeclarators(variableName)
    .find(j.StringLiteral);

  if (loginUriStringValue.length === 0) {
    throw new ReplacementTargetNotFoundError();
  }

  loginUriStringValue
    .replaceWith(
      j.stringLiteral(newValue)
    );
}
