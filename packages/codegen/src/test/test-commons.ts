import assert from "assert";
import fs from "fs";
import prettier = require('prettier');
import path from "path";
import {strictEqual} from "assert";
import {loadSchema} from "@graphql-tools/load";
import {expect} from "chai";

export function assertContent(actual: string, expect: string, multiline: boolean = true) {
  assert.strictEqual(drain(actual, multiline), drain(expect, multiline));
}

function drain(content: string, multiline: boolean = true) {
  const result = multiline
    ? content
      .replace(/^\s+/gm, '') //spaces at the line start, and empty lines
    : content
      .replace(/\n/g, ' ');  //multiline false - join in one line

  return result
    .replace(/\s{2,}/g, ' ') //two or more spaces with one space
    .trim();
}

export function format(file: string) {
  const formatted = prettier.format(fs.readFileSync(file, 'utf8'), {parser: "typescript"});
  fs.writeFileSync(file, formatted, 'utf8');
}

export function opts(dir: string, answers: any, modelPath: string) {
  return {
    model: modelPath,
    dest: dir,
    debug: true,
    answers: Buffer.from(JSON.stringify(answers)).toString('base64')
  }
}

/**
 * @deprecated use assertFilesPlain, which is not change file content, it is not required since we are using prettier
 */
export function assertFiles(filePath: string, clientDir: string, fixturesDir: string) {
  const actual = fs.readFileSync(path.join(clientDir, filePath), 'utf8');
  const expect = fs.readFileSync(path.join(fixturesDir, filePath), 'utf8');
  assertContent(actual, expect);
}

export function assertFilesPlain(filePath: string, clientDir: string, fixturesDir: string) {
  const actual = fs.readFileSync(path.join(clientDir, filePath), 'utf8');
  const expect = fs.readFileSync(path.join(fixturesDir, filePath), 'utf8');
  strictEqual(actual, expect);
}

/**
 * Test can fail when result and fixture contain different line separators (e.g. LF vs CRLF)
 *
 * @param str
 */
export function stripNewLines(str: string): string {
  return str.replace(/\r\n|\n/g, '');
}

export async function getMockSchema() {
  const schemaPath = path.join(__dirname, '../../../../scripts/schema/schema.graphql');
  const schemaString = fs.readFileSync(schemaPath, 'utf-8');
  return await loadSchema(schemaString, {loaders: []});
}

export function expectFileContainsIgnoreSpace(file: string, fragment: string) {
  expect(file.replace(/\s/g, '')).to.contain(fragment.replace(/\s/g, ''));
}
