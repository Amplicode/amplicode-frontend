import dayjs, {Dayjs} from "dayjs";
import {ScalarTransformer} from "../types";

export const customScalarTransformers: Record<string, ScalarTransformer> = {
  // We can use any GraphQLScalarType as ScalarTransformer,
  // for example, we can use graphql-scalars:
  // 'Date': GraphQLDate, // This will deserialize to JS Date

  // Or we can write our own functions:
  'Date': { // This will deserialize to Dayjs object
    serialize: (value?: Dayjs) => value ? value.format('YYYY-MM-DD') : value,
    parseValue: (value?: string) => value ? dayjs(value, 'YYYY-MM-DD') : value
  }
};