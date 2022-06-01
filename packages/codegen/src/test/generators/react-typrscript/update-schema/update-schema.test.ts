import path from "path";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA2_PATH, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import fs from "fs";

const GENERATOR = 'update-schema';
const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', GENERATOR);

describe('codegen update schema', async () => {
  before(async () => { await cleanup(DEST_DIR)});

  it('should update bundled schema', async () => {
    const bundledSchemaPath = path.join(DEST_DIR, 'src', 'core', 'schema', 'schema.graphql');
    // check that cleanup is completed, before test start
    expect(fs.existsSync(bundledSchemaPath)).to.be.false;

    let bundledSchema: string;

    // Single schema file
    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR), opts(DEST_DIR, {}, [SCHEMA_PATH]));
    bundledSchema = fs.readFileSync(bundledSchemaPath, 'utf-8');
    expect(bundledSchema).to.contain('type PetDTO');
    expect(bundledSchema).to.not.contain('type TestEntity');

    // Composite schema
    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR), opts(DEST_DIR, {}, [SCHEMA_PATH, SCHEMA2_PATH]));
    bundledSchema = fs.readFileSync(bundledSchemaPath, 'utf-8');
    expect(bundledSchema).to.contain('type PetDTO');
    expect(bundledSchema).to.contain('type TestEntity');
  });
});