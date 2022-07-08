import {expect} from "chai";
import j from "jscodeshift";
import {replaceStringValue} from "./replaceStringValue";
import {ReplacementTargetNotFoundError} from "./ReplacementTargetNotFoundError";

const tsParser = j.withParser('ts');

describe('replaceStringValue()', () => {
  it('replaces variable value in AST', () => {
    const ast = tsParser(envConfig);
    replaceStringValue(ast, 'LOGIN_URI', '/oauth2/authorize');
    expect(ast.toSource()).to.eq(envConfigModified);

    const ast2 = tsParser(viteConfig);
    replaceStringValue(ast2, 'LOGIN_BASE_URL', 'oauth2');
    expect(ast2.toSource()).to.eq(viteConfigModified);
  });

  it('throws exception when it cannot find the variable', () => {
    const ast = tsParser(envConfigFailing);
    expect(
      replaceStringValue.bind(undefined, ast, 'LOGIN_URI', '/oauth2/authorize')
    ).to.throw(ReplacementTargetNotFoundError);
  });
});

const envConfigFailing = `
export const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI ?? "/graphql";
export const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI ?? "/logout";
export const REQUEST_SAME_ORIGIN =
  import.meta.env.VITE_REQUEST_SAME_ORIGIN ?? true;
export const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN ?? "admin";
export const DEV_PASSWORD = import.meta.env.VITE_DEV_PASSWORD ?? "admin";
`;

const envConfig = `
export const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI ?? "/graphql";
export const LOGIN_URI = import.meta.env.VITE_LOGIN_URI ?? "/login";
export const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI ?? "/logout";
export const REQUEST_SAME_ORIGIN =
  import.meta.env.VITE_REQUEST_SAME_ORIGIN ?? true;
export const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN ?? "admin";
export const DEV_PASSWORD = import.meta.env.VITE_DEV_PASSWORD ?? "admin";
`;

  const envConfigModified = `
export const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI ?? "/graphql";
export const LOGIN_URI = import.meta.env.VITE_LOGIN_URI ?? "/oauth2/authorize";
export const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI ?? "/logout";
export const REQUEST_SAME_ORIGIN =
  import.meta.env.VITE_REQUEST_SAME_ORIGIN ?? true;
export const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN ?? "admin";
export const DEV_PASSWORD = import.meta.env.VITE_DEV_PASSWORD ?? "admin";
`;

const viteConfig = `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const PORT = "8080";
const SERVER_URL = "http://localhost";
const LOGIN_BASE_URL = "login";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  plugins: [react()],
  server: {
    proxy: {
      [\`^/(graphql|\${LOGIN_BASE_URL}|logout)\`]: \`\${SERVER_URL}:\${PORT}\`,
    }
  }
});
`;

const viteConfigModified = `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const PORT = "8080";
const SERVER_URL = "http://localhost";
const LOGIN_BASE_URL = "oauth2";

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  plugins: [react()],
  server: {
    proxy: {
      [\`^/(graphql|\${LOGIN_BASE_URL}|logout)\`]: \`\${SERVER_URL}:\${PORT}\`,
    }
  }
});
`;