import { Dayjs } from "dayjs";

export function serializeDate(value?: Dayjs) {
  return value != null ? value.format("YYYY-MM-DD") : value;
}
