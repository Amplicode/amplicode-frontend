import dayjs from "dayjs";

export function deserializeTimestamp(value?: string) {
  return value != null ? dayjs(Number(value)) : value;
}
