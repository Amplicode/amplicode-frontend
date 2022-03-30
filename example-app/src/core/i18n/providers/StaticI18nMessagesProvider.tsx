import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useI18nStore } from "@amplicode/react-core";
import enMessages from "../messages/en.json";
import ruMessages from "../messages/ru.json";
import enAntdLocale from "antd/es/locale/en_US";
import ruAntdLocale from "antd/es/locale/ru_RU";
import { convertAntdLocaleToMessages } from "../util/convertAntdLocaleToMessages";

export const staticMessages: Record<string, Record<string, string>> = {
  en: {
    ...convertAntdLocaleToMessages(enAntdLocale),
    ...enMessages
  },
  ru: {
    ...convertAntdLocaleToMessages(ruAntdLocale),
    ...ruMessages
  }
};

export interface StaticI18nMessagesProviderProps {
  children: React.ReactNode;
}
export const StaticI18nMessagesProvider = observer(
  ({ children }: StaticI18nMessagesProviderProps) => {
    const [staticMessagesLoading, setStaticMessagesLoading] = useState(true);

    const { mergeMessages } = useI18nStore();

    useEffect(() => {
      if (staticMessagesLoading) {
        Object.entries(staticMessages).forEach(([locale, messages]) => {
          mergeMessages(locale, messages);
        });
      }
      setStaticMessagesLoading(false);
    }, [mergeMessages, staticMessagesLoading]);

    // Static messages will be loaded after rerender. We need to wait for our static messages to load.
    if (staticMessagesLoading) return null;

    return <>{children}</>;
  }
);
