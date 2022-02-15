import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import {expect} from "chai";
import assert from "assert";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', 'app');

const answers = {
  appTitle: 'Amplicode Petclinic',
  appShortName: 'ampl-petclinic',
  graphqlUri: '/graphql',
  basePath: 'front'
};

describe('codegen app test', () => {

  it('should generate app', async () => {
    await cleanup(DEST_DIR);

    const codegenConfigPath = path.join(DEST_DIR, 'codegen.yml');
    const devEnvPath = path.join(DEST_DIR, '.env.development.local');
    const prodEnvPath = path.join(DEST_DIR, '.env.production.local');
    const manifestPath = path.join(DEST_DIR, 'public', 'manifest.json');

      // check that we remove previously generated app
    assert.ok(!fs.existsSync(codegenConfigPath));
    assert.ok(!fs.existsSync(devEnvPath));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'app'), opts(DEST_DIR, answers, SCHEMA_PATH));

    assert.ok(fs.existsSync(codegenConfigPath));
    assert.ok(fs.existsSync(devEnvPath));
    assert.ok(fs.existsSync(prodEnvPath));

    const doc = yaml.load(fs.readFileSync(codegenConfigPath, 'utf-8'));
    expect((doc as any).schema).eq('../../../../fixtures/schema/schema.graphql');

    expect(fs.readFileSync(devEnvPath, 'utf-8')).to.contain('REACT_APP_GRAPHQL_URI=/graphql');
    expect(fs.readFileSync(prodEnvPath, 'utf-8')).to.contain('REACT_APP_GRAPHQL_URI=/graphql');
    expect(fs.readFileSync(prodEnvPath, 'utf-8')).to.contain('PUBLIC_URL=/front/');

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    expect(manifest['short_name']).to.eq('ampl-petclinic');
    expect(manifest['name']).to.eq('Amplicode Petclinic');
  });

});

