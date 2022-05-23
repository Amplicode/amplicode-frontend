import { Dayjs } from "dayjs";

export function serializeLocalTime(value?: Dayjs) {
  return value != null ? value.format("HH:mm:ss.SSS") : value;
}
