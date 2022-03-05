import {GraphQLSchema} from "graphql";

export function getTypeFields(entityName: string, schema: GraphQLSchema) {
  const entityType = schema.getTypeMap()[entityName];

  if (!('getFields' in entityType)) {
    throw new Error(`Type ${entityType} does not contain fields. Are you sure it isn't a scalar?`);
  }

  return entityType.getFields();
}