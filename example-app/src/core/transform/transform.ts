import { getTypeDefs } from "../schema/util/getTypeDefs";
import {
  GraphQLEnumType,
  GraphQLFieldMap,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLUnionType
} from "graphql";
import {
  GraphQLInputFieldMap,
  GraphQLScalarType
} from "graphql/type/definition";
import { getTypeFields } from "../schema/util/getTypeFields";
import { NullableObjectOrList, ScalarTransformer } from "./types";
import { customScalarTransformers } from "./model/custom-scalars";

export interface TransformOptions {
  typename?: string;
  transformers?: Record<string, ScalarTransformer>;
}

export function transform<T extends NullableObjectOrList>(
  data: T,
  operation: "serialize" | "deserialize",
  options?: TransformOptions
): T {
  if (data == null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => transform(item, operation, options)) as T;
  }

  const typename = options?.typename ?? (data["__typename"] as string);
  if (typename == null) {
    console.warn(
      `Cannot determine typename.` +
        ` Custom scalars will not be ${operation}d.`
    );
    return data;
  }

  // Process custom scalars
  const processedItem: Record<string, unknown> = {};

  const transformerMap = {
    ...customScalarTransformers,
    ...options?.transformers
  };

  Object.keys(data as object).forEach((fieldName: string) => {
    if (fieldName === "__typename") {
      // Leave __typename in the output so that it can be further transformed
      processedItem[fieldName] = data[fieldName];
      return;
    }
    const schema = getTypeDefs();
    const fieldTypeName = getFieldTypeName(fieldName, typename, schema);

    const transformer = transformerMap[fieldTypeName];
    if (transformer == null) {
      // Not a custom scalar
      processedItem[fieldName] = data[fieldName];
      return;
    }

    const unsupportedOperationErrorMessage =
      `Error when attempting to ${operation} field ${fieldName} of custom scalar type ${fieldTypeName}.` +
      `Provided transformer does not support ${operation} operation.`;

    switch (operation) {
      case "serialize":
        if (transformer.serialize == null) {
          throw new Error(unsupportedOperationErrorMessage);
        }
        processedItem[fieldName] = transformer.serialize(data[fieldName]);
        break;
      case "deserialize":
        if (transformer.parseValue == null) {
          throw new Error(unsupportedOperationErrorMessage);
        }
        processedItem[fieldName] = transformer.parseValue(data[fieldName]);
        break;
      default:
        throw new Error(`Unexpected operation ${operation}`);
    }
  });

  return processedItem as T;
}

function getFieldTypeName(
  fieldName: string,
  typename: string,
  schema: GraphQLSchema
): string {
  const fields:
    | GraphQLFieldMap<any, any>
    | GraphQLInputFieldMap = getTypeFields(typename, schema);
  const fieldType = fields[fieldName].type;
  if (
    fieldType instanceof GraphQLScalarType ||
    fieldType instanceof GraphQLEnumType ||
    fieldType instanceof GraphQLInputObjectType ||
    fieldType instanceof GraphQLInterfaceType ||
    fieldType instanceof GraphQLUnionType ||
    fieldType instanceof GraphQLObjectType
  ) {
    return fieldType.name;
  }
  return fieldType.ofType.name;
}
