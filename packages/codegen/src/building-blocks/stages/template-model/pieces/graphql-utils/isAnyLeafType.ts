import {GraphQLList, GraphQLType} from "graphql";

/**
 * A replacement of `isLeafType` from `graphql/type/definition`
 * that returns `true` for non-nullable types
 *
 * @param type
 */
export function isAnyLeafType(type: GraphQLType): boolean {
  if (type instanceof GraphQLList) {
    return !('getFields' in (type as GraphQLList<any>).ofType)
  }

  return !('getFields' in type);
}
