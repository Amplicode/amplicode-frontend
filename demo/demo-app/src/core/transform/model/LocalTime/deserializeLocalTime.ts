import dayjs from "dayjs";

// 24-hour time - `HH:mm`
const LOCAL_TIME_FORMAT = /^([0-1][0-9]|2[0-3])$/;
// 24-hour time with seconds - `HH:mm:ss`
const LOCAL_TIME_FORMAT_SECONDS = /^([0-1][0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])$/;
// 24-hour time with seconds and mills - `HH:mm:ss.SSS`
const LOCAL_TIME_FORMAT_MILLS = /^([0-1][0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9](\.\d{3})?)$/;

export function deserializeLocalTime(value?: string) {
  if (value == null) {
    return value;
  }

  if (LOCAL_TIME_FORMAT.test(value)) {
    return dayjs(value, "HH:mm");
  }

  if (LOCAL_TIME_FORMAT_SECONDS.test(value)) {
    return dayjs(value, "HH:mm:ss");
  }

  if (LOCAL_TIME_FORMAT_MILLS.test(value)) {
    return dayjs(value, "HH:mm:ss.SSS");
  }

  throw new Error(`Value is not a valid LocalTime: ${value}`);
}
