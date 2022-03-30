import { flatten } from "@amplicode/react-core";
import { Locale } from "antd/es/locale-provider";

export const ANTD_MESSAGE_PREFIX = "antd.";

export function convertAntdLocaleToMessages(
  antdLocale: Locale
): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale, ...antdMessagesObject } = antdLocale;

  const antdMessages = flatten(antdMessagesObject);
  const antdMessagesWithPrefix = Object.entries(antdMessages).reduce<
    Record<string, string>
  >((acc, [key, message]) => {
    acc[ANTD_MESSAGE_PREFIX + key] = message;
    return acc;
  }, {});

  return antdMessagesWithPrefix;
}
