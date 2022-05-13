import { Dayjs } from "dayjs";

export function serializeDateTime(value?: Dayjs) {
  return value != null ? value.format("YYYY-MM-DDTHH:mm:ssZ") : value;
}
