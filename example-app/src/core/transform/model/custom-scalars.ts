import {GraphQLScalarSerializer, GraphQLScalarType, GraphQLScalarValueParser} from "graphql/type/definition";
import dayjs, {Dayjs} from "dayjs";
import {ScalarTransformer} from "../types";

export const customScalarTransformers: Record<string, ScalarTransformer | GraphQLScalarType> = {
  // We can use graphql-scalars here if we are happy with its serialization/deserialization functions
  // 'Date': GraphQLDate // This will deserialize to JS Date
  //
  // If we are not, we can write our own functions:
  'Date': {
    serialize: (value?: Dayjs) => value ? value.format('YYYY-MM-DD') : value,
    parseValue: (value?: string) => value ? dayjs(value, 'YYYY-MM-DD') : value
  }
};