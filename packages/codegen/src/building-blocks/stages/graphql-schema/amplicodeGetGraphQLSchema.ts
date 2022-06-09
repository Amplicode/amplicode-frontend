import {AmplicodeCommonOptions} from "../options/pieces/amplicode";
import {GraphQLSchema} from "graphql";
import * as path from "path";
import * as fs from "fs";
import {loadSchema} from "@graphql-tools/load";

export const amplicodeGetGraphQLSchema = async <O extends AmplicodeCommonOptions>(
  options: O, invocationDir: string
): Promise<GraphQLSchema | undefined> => {

  if (options.schema.length < 1) {
    throw new Error(`GraphQL schema not passed in options`);
  }

  const schemaPaths: string[] = options.schema[0];
  const schemaStringArray: string[] = [];

  for (const schemaPath of schemaPaths) {
    const absolutePath = path.isAbsolute(schemaPath) ? schemaPath : path.join(invocationDir, schemaPath);
    schemaStringArray.push(await readSchemaFile(absolutePath));
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
