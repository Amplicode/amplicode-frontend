import {expect} from "chai";
import { removeVarExport } from "./removeVarExport";
import j from "jscodeshift";

describe('removeVar()', () => {
  it('removes variable from ts file', () => {
    const tsParser = j.withParser('ts');
    const ast = tsParser(file);

    removeVarExport(ast, 'LOGIN_URI');
    removeVarExport(ast, 'LOGOUT_URI');
    removeVarExport(ast, 'REQUEST_SAME_ORIGIN');
    removeVarExport(ast, 'DEV_LOGIN');
    removeVarExport(ast, 'DEV_PASSWORD');
    expect(ast.toSource()).to.eq(fileModified);
  });
});

const file = `
export const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI ?? "/graphql";
export const LOGIN_URI = import.meta.env.VITE_LOGIN_URI ?? "/login";
export const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI ?? "/logout";
export const REQUEST_SAME_ORIGIN =
  import.meta.env.VITE_REQUEST_SAME_ORIGIN ?? true;
export const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN ?? "admin";
export const DEV_PASSWORD = import.meta.env.VITE_DEV_PASSWORD ?? "admin";
`;

const fileModified = `
export const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI ?? "/graphql";
`;