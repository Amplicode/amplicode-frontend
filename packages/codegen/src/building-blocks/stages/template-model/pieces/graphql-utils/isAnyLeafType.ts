import {GraphQLType} from "graphql";

/**
 * A replacement of `isLeafType` from `graphql/type/definition`
 * that returns `true` for non-nullable types
 *
 * @param type
 */
export function isAnyLeafType(type: GraphQLType): boolean {
  return !('getFields' in type);
}