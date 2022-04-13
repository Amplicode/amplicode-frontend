import { buildClientSchema, buildSchema, GraphQLSchema } from "graphql";
import { typeDefs } from "../typeDefs";

export function getTypeDefs(): GraphQLSchema {
  let isSdlFormat = false;
  let introspection;
  try {
    introspection = JSON.parse(typeDefs);
  } catch (e) {
    isSdlFormat = true;
  }

  return isSdlFormat
    ? buildSchema(typeDefs)
    : buildClientSchema(introspection.data);
}
