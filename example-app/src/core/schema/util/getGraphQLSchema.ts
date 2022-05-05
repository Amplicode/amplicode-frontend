import { buildClientSchema, buildSchema, GraphQLSchema } from "graphql";
import schemaAsString from "./../schema.graphql?raw";

export function getGraphQLSchema(): GraphQLSchema {
  let isSdlFormat = false;
  let introspection;
  try {
    introspection = JSON.parse(schemaAsString);
  } catch (e) {
    isSdlFormat = true;
  }

  return isSdlFormat
    ? buildSchema(schemaAsString)
    : buildClientSchema(introspection.data);
}
