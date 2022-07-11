import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import {expect} from "chai";
import assert from "assert";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA2_PATH, SCHEMA_PATH} from "../common";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";

const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'app');
const GENERATOR_DIR = path.join(GENERATORS_DIR, 'app');


const answers = {
  appTitle: 'Amplicode Petclinic',
  appShortName: 'ampl-petclinic',
  graphqlUri: '/graphql',
  basePath: 'front',
  menuType: 'vertical'
};

describe('codegen app test', () => {

  it('should generate app (single schema file)', async () => {
    await cleanup(DEST_DIR);

    const codegenConfigPath = path.join(DEST_DIR, 'codegen.yml');
    const devEnvPath = path.join(DEST_DIR, '.env.development');
    const prodEnvPath = path.join(DEST_DIR, '.env.production');
    const errorBoundaryPath = path.join(DEST_DIR, 'src', 'core', 'error', 'ErrorBoundary.tsx');

    // check that we remove previously generated app
    assert.ok(!fs.existsSync(codegenConfigPath));
    assert.ok(!fs.existsSync(devEnvPath));

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

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

    const errorBoundaryFile = fs.readFileSync(errorBoundaryPath, 'utf-8');
    expectFileContainsIgnoreSpace(errorBoundaryFile, `
      export const AppErrorBoundary = function(props: PropsWithChildren<{}>) {
        const intl = useIntl();
      
        return (
          <ErrorBoundary
            message={intl.formatMessage({ id: "common.unknownAppError" })}
            render={message => <Result status="error" title={message} />}
          >
            {props.children}
          </ErrorBoundary>
        );
      };
    `);
  });

  it('should generate app (composite schema)', async () => {
    const schemaPaths = [SCHEMA_PATH, SCHEMA2_PATH];
    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, schemaPaths));

    const appSchemaPath = path.join(DEST_DIR, 'src', 'core', 'schema', 'schema.graphql');
    expect(fs.readFileSync(appSchemaPath, 'utf-8')).to.contain('type PetDTO {');
    expect(fs.readFileSync(appSchemaPath, 'utf-8')).to.contain('type TestEntity {');
  });
});

