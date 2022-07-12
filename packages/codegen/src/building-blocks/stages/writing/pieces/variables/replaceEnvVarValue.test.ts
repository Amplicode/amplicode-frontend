import {expect} from "chai";
import {replaceEnvVarValue} from "./replaceEnvVarValue";
import {ReplacementTargetNotFoundError} from "./ReplacementTargetNotFoundError";

describe('replaceEnvVarValue()', () => {
  it('replaces env variable value when it is found', () => {
    const output = replaceEnvVarValue(envDev, 'VITE_LOGIN_URI', '/oauth2/authorize');
    expect(output).to.eq(envDevModified);
  });

  it('throws ReplacementTargetNotFoundError when env variable is not found', () => {
    expect(replaceEnvVarValue.bind(undefined, envDevFailing, 'VITE_LOGIN_URI', '/oauth2/authorize'))
      .to.throw(ReplacementTargetNotFoundError);
  });
});

const envDev = `
VITE_GRAPHQL_URI=/graphql
VITE_LOGIN_URI=/login
VITE_LOGOUT_URI=/logout
VITE_REQUEST_SAME_ORIGIN=true
VITE_DEV_LOGIN=admin
VITE_DEV_PASSWORD=admin
`;

const envDevModified = `
VITE_GRAPHQL_URI=/graphql
VITE_LOGIN_URI=/oauth2/authorize
VITE_LOGOUT_URI=/logout
VITE_REQUEST_SAME_ORIGIN=true
VITE_DEV_LOGIN=admin
VITE_DEV_PASSWORD=admin
`;

const envDevFailing = `
VITE_GRAPHQL_URI=/graphql
VITE_LOGOUT_URI=/logout
VITE_REQUEST_SAME_ORIGIN=true
VITE_DEV_LOGIN=admin
VITE_DEV_PASSWORD=admin
`;