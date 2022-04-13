import { ScalarTransformer } from "../types";
import { serializeDate } from "./Date/serializeDate";
import { deserializeDate } from "./Date/deserializeDate";

export const customScalarTransformers: Record<string, ScalarTransformer> = {
  // We can use any GraphQLScalarType as ScalarTransformer,
  // for example, we can use graphql-scalars:
  // 'Date': GraphQLDate, // This will deserialize to JS Date

  // Or we can write our own functions
  Date: {
    // This will deserialize to / serialize from Dayjs object
    serialize: serializeDate,
    parseValue: deserializeDate
  }
};
