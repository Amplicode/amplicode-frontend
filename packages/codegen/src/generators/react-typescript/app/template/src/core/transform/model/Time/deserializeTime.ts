import dayjs from "dayjs";

export function deserializeTime(value?: string) {
  return value != null ? dayjs(value, "HH:mm:ssZ") : value;
}
