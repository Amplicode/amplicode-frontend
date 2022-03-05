import {GraphQLSchema} from "graphql";

export function getAttributeNames(entityName: string, schema: GraphQLSchema): string[] {
  const type = schema.getTypeMap()?.[entityName];

  if (!('getFields' in type)) {
    throw new Error('Cannot find attributes of ' + entityName);
  }

  return Object.keys(type.getFields());
}