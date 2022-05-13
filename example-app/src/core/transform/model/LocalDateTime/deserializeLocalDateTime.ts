import dayjs from "dayjs";

export function deserializeLocalDateTime(value?: string) {
  return value != null ? dayjs(value, "YYYY-MM-DDTHH:mm:ss") : value;
}
