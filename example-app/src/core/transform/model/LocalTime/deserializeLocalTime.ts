import dayjs from "dayjs";

export function deserializeLocalTime(value?: string) {
  return value != null ? dayjs(value, "HH:mm:ss") : value;
}
