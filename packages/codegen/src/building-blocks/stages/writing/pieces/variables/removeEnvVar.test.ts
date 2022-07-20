import {expect} from "chai";
import {removeEnvVar} from "./removeEnvVar";

describe('removeEnvVar()', () => {
  it('remove env variable', () => {
    let output = envDev;
    output = removeEnvVar(output, 'VITE_REQUEST_SAME_ORIGIN');
    output = removeEnvVar(output, 'VITE_DEV_LOGIN');
    output = removeEnvVar(output, 'VITE_DEV_PASSWORD');
    expect(output).to.eq(envDevModified);
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
VITE_LOGIN_URI=/login
VITE_LOGOUT_URI=/logout
`;