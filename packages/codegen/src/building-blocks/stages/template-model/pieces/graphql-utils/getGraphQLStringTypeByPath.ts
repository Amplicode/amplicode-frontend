import { GraphQLField, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from "graphql";

/**
 * Getting a type of nested field inside graphQL schema using a path to this field
 * 
 * @param schema - graphQL schema
 * @param currentField - field of graphQL schema
 * @param currentPath - path to nested field
 * 
 * @returns - string type of nested field got by path
 */
 export function getGraphQLStringTypeByPath<TSource, TContext>(
  schema: GraphQLSchema,
  currentField: GraphQLField<TSource, TContext>,
  currentPath: string[],
): string {
  if (currentPath.length === 0) {
    return currentField.type.inspect();
  }

  const [head, ...tail] = currentPath;
  const {type} = currentField;

  const currentGraphQLType =
    type instanceof GraphQLList || type instanceof GraphQLNonNull
      ? schema.getType(type.ofType)
      : schema.getType(type.name);
  
  if(!(currentGraphQLType instanceof GraphQLObjectType)) {
    throw new Error(`${type.inspect()} isn't GraphQLObjectType for getting GraphQL String Type by path`);
  }
  const headField = currentGraphQLType.getFields()[head];

  if(headField === undefined) {
    throw new Error("Path doesn't exist");
  }

  return getGraphQLStringTypeByPath(schema, headField, tail);
}
