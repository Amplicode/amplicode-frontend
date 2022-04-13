import dayjs from "dayjs";

export function deserializeDate(value?: string) {
  return value != null ? dayjs(value, "YYYY-MM-DD") : value;
}
