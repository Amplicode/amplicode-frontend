import { Dayjs } from "dayjs";

export function serializeLocalDateTime(value?: Dayjs) {
  return value != null ? value.format("YYYY-MM-DDTHH:mm:ss") : value;
}
