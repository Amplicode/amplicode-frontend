import {AmplicodeCommonOptions} from "../options/pieces/amplicode";
import {buildClientSchema, GraphQLSchema} from "graphql";
import * as path from "path";
import * as fs from "fs";
import {loadSchema} from "@graphql-tools/load";

/**
 * This is the path:
 *
 * project-folder
 * ├── frontend
 * │   └── generation
 * │       └── node_modules
 * │           └── @haulmont
 * │               └── jmix-front-generator
 * │                   └── bin <-------------- FROM HERE
 * ├── src
 *     └── main
 *         └── resources
 *             └── graphql
 *                 └── schema.graphqls <------------------- TO HERE
 *
 */
const DEFAULT_SCHEMA_PATH = '../../../../../../src/main/resources/graphql/schema.graphqls';

export const amplicodeGetGraphQLSchema = async <O extends AmplicodeCommonOptions>(
  options: O, invocationDir: string
): Promise<GraphQLSchema | undefined> => {
  if (options.schema == null) {
    return undefined;
  }

  const schemaPathsAbsolute: string[] = getSchemaPaths(invocationDir, options.schema);

  const schemaStringArray: string[] = [];

  for (const schemaPathAbsolute of schemaPathsAbsolute) {
    schemaStringArray.push(await readSchemaFile(schemaPathAbsolute));
  }

  // Schema files should be SDL format, introspection JSON format is not supported
  return await loadSchema(schemaStringArray, {loaders: []})
}

async function readSchemaFile(schemaPathAbsolute: string): Promise<string> {
  if (!fs.existsSync(schemaPathAbsolute)) {
    throw new Error(`GraphQL schema not found at "${schemaPathAbsolute}"`);
  }

  return fs.readFileSync(schemaPathAbsolute, 'utf-8');
}

function getSchemaPaths(invocationDir: string, schemaArg?: string[][]): string[] {
  if (schemaArg == null || schemaArg.length == null) {
    return [DEFAULT_SCHEMA_PATH];
  }

  return schemaArg[0].map(arg => fixPath(arg, invocationDir));
}

function fixPath(pathToBeFixed: string, invocationDir: string): string {
  if (path.isAbsolute(pathToBeFixed)) {
    return pathToBeFixed;
  }

  return path.join(invocationDir, pathToBeFixed);
}