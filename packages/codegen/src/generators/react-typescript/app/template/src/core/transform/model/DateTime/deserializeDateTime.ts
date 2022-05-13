import dayjs from "dayjs";

export function deserializeDateTime(value?: string) {
  return value != null ? dayjs(value, "YYYY-MM-DDTHH:mm:ssZ") : value;
}
