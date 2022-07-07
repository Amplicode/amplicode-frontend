import { getNamedType, GraphQLInputObjectType, GraphQLObjectType, GraphQLSchema, isInputObjectType, isObjectType } from "graphql";

export function unpackPaginationType(type: GraphQLInputObjectType | GraphQLObjectType, schema: GraphQLSchema) {
  if (type.getFields()['content'] && type.getFields()['totalElements']) {
    const entityContentType = schema.getTypeMap()[getNamedType(type.getFields()['content'].type).toString()];

    if (!isInputObjectType(entityContentType) && !isObjectType(entityContentType)) {
      throw new Error(`Type ${entityContentType} does not contain fields. Are you sure it isn't a scalar?`);
    }

    return entityContentType;
  }

  return type;
}