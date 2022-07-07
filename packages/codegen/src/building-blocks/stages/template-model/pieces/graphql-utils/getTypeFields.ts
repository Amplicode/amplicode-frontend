import {GraphQLSchema, isInputObjectType, isObjectType} from "graphql";
import { unpackPaginationType } from "./unpackPaginationType";

export function getTypeFields(entityName: string, schema: GraphQLSchema) {
  const entityType = schema.getTypeMap()[entityName];

  if (!isInputObjectType(entityType) && !isObjectType(entityType)) {
    throw new Error(`Type ${entityType} does not contain fields. Are you sure it isn't a scalar?`);
  }

  return unpackPaginationType(entityType, schema).getFields();
}
