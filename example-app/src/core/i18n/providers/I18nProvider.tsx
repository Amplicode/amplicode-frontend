import { StaticI18nMessagesProvider } from "./StaticI18nMessagesProvider";
import { I18nApiProvider } from "./I18nApiProvider";
import { I18nStoreProvider, LocaleConfigOption } from "@amplicode/react-core";

export const localeConfigs: Record<string, LocaleConfigOption> = {
  en: { caption: "English" },
  ru: { caption: "Русский" }
};

export interface I18nProviderProps {
  children: React.ReactNode;
}
export function I18nProvider({ children }: I18nProviderProps) {
  return (
    <I18nStoreProvider localeConfigs={localeConfigs} defaultLocale="en">
      <StaticI18nMessagesProvider>
        <I18nApiProvider>{children}</I18nApiProvider>
      </StaticI18nMessagesProvider>
    </I18nStoreProvider>
  );
}
