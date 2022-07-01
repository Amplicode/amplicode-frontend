import {getNamedType, GraphQLSchema, isInputObjectType, isObjectType} from "graphql";

export function getTypeFields(entityName: string, schema: GraphQLSchema) {
  const entityType = schema.getTypeMap()[entityName];

  if (!isInputObjectType(entityType) && !isObjectType(entityType)) {
    throw new Error(`Type ${entityType} does not contain fields. Are you sure it isn't a scalar?`);
  }

  // For pagination
  if (entityType.getFields()['content'] && entityType.getFields()['totalElements']) {
    const entityContentType = schema.getTypeMap()[getNamedType(entityType.getFields()['content'].type).toString()];
    if (!isInputObjectType(entityContentType) && !isObjectType(entityContentType)) {
      throw new Error(`Type ${entityContentType} does not contain fields. Are you sure it isn't a scalar?`);
    }
    return entityContentType.getFields();
  }

  return entityType.getFields();
}