const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const assert = require('assert');
const path = require('path');

const CODEGEN_CMD = path.join(process.cwd(), 'bin', 'amplicodegen.js');

describe('test:e2e:cli:list', () => {

  it('should show "isFrontendComponent" attribute in generators in list', async function () {
    await exec(`${CODEGEN_CMD} list`)
      .then(onful => {
        const list = JSON.parse(onful.stdout);
        list[0].generators.forEach(generator => {
          // non-component generators
          if (['app', 'update-schema', 'auth-oauth2-keycloak-stateful'].some(genName => genName === generator.name)) {
            assert.ok(generator.isFrontendComponent === false);
          // component generators
          } else {
            assert.ok(generator.isFrontendComponent === true);
          }
        });

        // console.log(inspect(list, false, null))
      });
  });
});
