import { GraphQLSchema } from "graphql";

export function getTypeFields(typeName: string, schema: GraphQLSchema) {
  const entityType = schema.getTypeMap()[typeName];

  if (!("getFields" in entityType)) {
    throw new Error(`Type ${entityType} is a scalar`);
  }

  return entityType.getFields();
}
