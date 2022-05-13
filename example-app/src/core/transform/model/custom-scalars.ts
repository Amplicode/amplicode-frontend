import { ScalarTransformer } from "../types";
import { serializeDate } from "./Date/serializeDate";
import { deserializeDate } from "./Date/deserializeDate";
import { serializeLocalDateTime } from "./LocalDateTime/serializeLocalDateTime";
import { deserializeLocalDateTime } from "./LocalDateTime/deserializeLocalDateTime";
import { serializeLocalTime } from "./LocalTime/serializeLocalTime";
import { deserializeLocalTime } from "./LocalTime/deserializeLocalTime";
import { serializeDateTime } from "./DateTime/serializeDateTime";
import { deserializeDateTime } from "./DateTime/deserializeDateTime";
import { serializeTime } from "./Time/serializeTime";
import { deserializeTime } from "./Time/deserializeTime";
import { serializeTimestamp } from "./Timestamp/serializeTimestamp";
import { deserializeTimestamp } from "./Timestamp/deserializeTimestamp";

export const customScalarTransformers: Record<string, ScalarTransformer> = {
  // We can use any GraphQLScalarType as ScalarTransformer,
  // for example, we can use graphql-scalars:
  // 'Date': GraphQLDate, // This will deserialize to JS Date

  // Or we can write our own functions
  Date: {
    // This will deserialize to / serialize from Dayjs object
    serialize: serializeDate,
    parseValue: deserializeDate
  },
  DateTime: {
    // This will deserialize to / serialize from Dayjs object
    serialize: serializeDateTime,
    parseValue: deserializeDateTime
  },
  LocalDateTime: {
    // This will deserialize to / serialize from Dayjs object
    serialize: serializeLocalDateTime,
    parseValue: deserializeLocalDateTime
  },
  LocalTime: {
    // This will deserialize to / serialize from Dayjs object
    serialize: serializeLocalTime,
    parseValue: deserializeLocalTime
  },
  Time: {
    // This will deserialize to / serialize from Dayjs object
    serialize: serializeTime,
    parseValue: deserializeTime
  },
  Timestamp: {
    // This will deserialize to / serialize from Dayjs object
    serialize: serializeTimestamp,
    parseValue: deserializeTimestamp
  }
};
