import {GraphQLSchema} from "graphql";

export function getEntityName(queryName: string, schema: GraphQLSchema) {
  const type = schema.getQueryType()?.getFields()?.[queryName]?.type;

  if (type == null) {
    throw new Error(`queryName: ${queryName}, cannot find type in field: ${JSON.stringify(schema.getQueryType()?.getFields()?.[queryName])}`);
  }

  if ('ofType' in type) {
    return type.ofType.name;
  }

  return type.name;
}