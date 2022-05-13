import { Dayjs } from "dayjs";

export function serializeTimestamp(value?: Dayjs) {
  return value != null ? String(value.valueOf()) : value;
}
