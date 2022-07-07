import {getNamedType, GraphQLSchema, isInputObjectType, isObjectType} from "graphql";
import { unpackPaginationType } from "./unpackPaginationType";

export function getEntityName(queryName: string, schema: GraphQLSchema) {
  const type = schema.getQueryType()?.getFields()?.[queryName]?.type;

  if (type == null) {
    throw new Error(`queryName: ${queryName}, cannot find type in field: ${JSON.stringify(schema.getQueryType()?.getFields()?.[queryName])}`);
  }

  const entityType = isInputObjectType(type) || isObjectType(type)
    ? unpackPaginationType(type, schema)
    : type

  return getNamedType(entityType).name;
}