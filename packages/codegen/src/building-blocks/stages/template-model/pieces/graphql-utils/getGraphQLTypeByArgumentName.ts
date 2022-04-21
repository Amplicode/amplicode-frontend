import { GraphQLField, GraphQLSchema } from "graphql";
import { getGraphQLTypeByRelativePath } from "./getGraphQLTypeByRelativePath";

export function getGraphQLTypeByArgumentName<TSource, TContext>(schema: GraphQLSchema, field: GraphQLField<TSource, TContext>, argumentName: string[]) {
  const [head, ...tail] = argumentName;
  const argType = field.args.find(arg => arg.name === head)?.type;

  if (argType == null) throw new Error(`${head} arg don't exist in the ${field.type.toString()} field`);

  return getGraphQLTypeByRelativePath(schema, argType, tail);
}
