import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import fs from "fs";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";
import {expect} from "chai";

const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'blank');
const GENERATOR_DIR = path.join(GENERATORS_DIR, 'blank');

const answers = {
  componentName: 'BlankComponent',
  shouldAddToMenu: false
};
const componentPath = path.join(DEST_DIR, 'BlankComponent.tsx');

describe('codegen blank component test', () => {

  it('should generate blank component ', async () => {

    await cleanup(DEST_DIR);
    expect(!fs.existsSync(componentPath));
    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const expectedContent = `
      export function BlankComponent() {
        return <div>BlankComponent</div>;
      }`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expectFileContainsIgnoreSpace(componentFile, expectedContent);
  });
});
