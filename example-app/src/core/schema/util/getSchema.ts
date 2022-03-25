import {buildClientSchema, buildSchema, GraphQLSchema} from "graphql";
import { schemaString } from "../schema";

export function getSchema(): GraphQLSchema {
  let isSdlFormat = false;
  let introspection;
  try {
    introspection = JSON.parse(schemaString);
  } catch (e) {
    isSdlFormat = true;
  }

  return isSdlFormat
    ? buildSchema(schemaString)
    : buildClientSchema(introspection.data);
}
