import { StaticI18nMessagesProvider } from "./StaticI18nMessagesProvider";
import { I18nApiProvider } from "./I18nApiProvider";
import {
  I18nStore,
  I18nStoreProvider,
  LocaleConfigOption
} from "@amplicode/react";
import { AntdConfigProvider } from "./AntdConfigProvider";
import { DayjsProvider } from "./DayjsProvider";
import enAntdLocale from "antd/es/locale/en_US";
import ruAntdLocale from "antd/es/locale/ru_RU";
import "dayjs/locale/en";
import "dayjs/locale/ru";

export const localeConfigs: Record<string, LocaleConfigOption> = {
  en: { caption: "English", antdLocale: enAntdLocale },
  ru: { caption: "Русский", antdLocale: ruAntdLocale }
};

export const i18nStore = new I18nStore(localeConfigs, "en");

export interface I18nProviderProps {
  children: React.ReactNode;
}
export function I18nProvider({ children }: I18nProviderProps) {
  return (
    <I18nStoreProvider
      store={i18nStore}
      localeConfigs={localeConfigs}
      defaultLocale="en"
    >
      <StaticI18nMessagesProvider>
        <I18nApiProvider>
          <AntdConfigProvider>
            <DayjsProvider>{children}</DayjsProvider>
          </AntdConfigProvider>
        </I18nApiProvider>
      </StaticI18nMessagesProvider>
    </I18nStoreProvider>
  );
}
