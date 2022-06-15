import { Dayjs } from "dayjs";

export function serializeTime(value?: Dayjs) {
  return value != null ? value.format("HH:mm:ssZ") : value;
}
