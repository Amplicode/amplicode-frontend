import { getNamedType, GraphQLInputObjectType, GraphQLInterfaceType, GraphQLObjectType, GraphQLSchema, GraphQLType } from "graphql";

/**
 * Getting graphQL type by relative path from another nested graphQL type
 * 
 * @param schema - graphQL schema
 * @param type - type of graphQL schema
 * @param path - path to nested type
 * 
 * @returns - GraphQLType of nested type got by path
 */
export function getGraphQLTypeByRelativePath(
  schema: GraphQLSchema,
  type: GraphQLType,
  path: string[],
): GraphQLType {
  if (path.length === 0) {
    return type;
  }

  const [head, ...tail] = path;

  const currentGraphQLType = schema.getType(getNamedType(type).name);
  
  if(!(
    currentGraphQLType instanceof GraphQLObjectType
    || currentGraphQLType instanceof GraphQLInputObjectType
    || currentGraphQLType instanceof GraphQLInterfaceType
  )) {
    throw new Error(`${type.toString()} don't have fields for getting GraphQL Type by path`);
  }
  const headField = currentGraphQLType.getFields()[head];

  if(headField === undefined) {
    throw new Error("Path doesn't exist");
  }

  return getGraphQLTypeByRelativePath(schema, headField.type, tail);
}
