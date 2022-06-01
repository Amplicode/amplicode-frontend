import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import {expect} from "chai";
import assert from "assert";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA2_PATH, SCHEMA_PATH} from "../../commons";

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', 'app');

const answers = {
  appTitle: 'Amplicode Petclinic',
  appShortName: 'ampl-petclinic',
  graphqlUri: '/graphql',
  basePath: 'front'
};

describe('codegen app test', () => {

  it('should generate app (single schema file)', async () => {
    await cleanup(DEST_DIR);

    const codegenConfigPath = path.join(DEST_DIR, 'codegen.yml');
    const devEnvPath = path.join(DEST_DIR, '.env.development');
    const prodEnvPath = path.join(DEST_DIR, '.env.production');

    // check that we remove previously generated app
    assert.ok(!fs.existsSync(codegenConfigPath));
    assert.ok(!fs.existsSync(devEnvPath));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'app'), opts(DEST_DIR, answers, [SCHEMA_PATH]));

    assert.ok(fs.existsSync(codegenConfigPath));
    assert.ok(fs.existsSync(devEnvPath));
    assert.ok(fs.existsSync(prodEnvPath));

    const doc = yaml.load(fs.readFileSync(codegenConfigPath, 'utf-8'));
    expect((doc as any).schema).eq('./src/core/schema/schema.graphql');

    expect(fs.readFileSync(devEnvPath, 'utf-8')).to.contain('VITE_GRAPHQL_URI=/graphql');
    expect(fs.readFileSync(prodEnvPath, 'utf-8')).to.contain('VITE_GRAPHQL_URI=/graphql');

    const appSchemaPath = path.join(DEST_DIR, 'src', 'core', 'schema', 'schema.graphql');
    expect(fs.readFileSync(appSchemaPath, 'utf-8')).to.contain('type PetDTO {');
    expect(fs.readFileSync(appSchemaPath, 'utf-8')).not.to.contain('type TestEntity {');
  });

  it('should generate app (composite schema)', async () => {
    const schemaPaths = [SCHEMA_PATH, SCHEMA2_PATH];
    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'app'), opts(DEST_DIR, answers, schemaPaths));

    const appSchemaPath = path.join(DEST_DIR, 'src', 'core', 'schema', 'schema.graphql');
    expect(fs.readFileSync(appSchemaPath, 'utf-8')).to.contain('type PetDTO {');
    expect(fs.readFileSync(appSchemaPath, 'utf-8')).to.contain('type TestEntity {');
  });
});

