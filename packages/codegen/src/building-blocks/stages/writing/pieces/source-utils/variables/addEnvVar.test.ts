import {expect} from "chai";
import { addEnvVar } from "./addEnvVar";

describe('addEnvVar()', () => {
  it('adds environment variable', () => {
    let output = envDev;
    output = addEnvVar(output, 'VITE_LOGIN_URI', '/login');
    output = addEnvVar(output, 'VITE_LOGOUT_URI', '/logout');
    output = addEnvVar(output, 'VITE_REQUEST_SAME_ORIGIN', 'true');
    output = addEnvVar(output, 'VITE_DEV_LOGIN', 'admin');
    output = addEnvVar(output, 'VITE_DEV_PASSWORD', 'admin');
    expect(output).to.eq(envDevModified);
  });
})

const envDev = `
VITE_GRAPHQL_URI=/graphql`;

const envDevModified = `
VITE_GRAPHQL_URI=/graphql
VITE_LOGIN_URI=/login
VITE_LOGOUT_URI=/logout
VITE_REQUEST_SAME_ORIGIN=true
VITE_DEV_LOGIN=admin
VITE_DEV_PASSWORD=admin`;

