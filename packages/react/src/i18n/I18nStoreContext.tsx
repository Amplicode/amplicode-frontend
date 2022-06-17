import { createContext, useContext, useState } from "react"
import { I18nStore, LocaleConfigOption } from "./I18nStore";

export const I18nStoreContext = createContext(new I18nStore({en: {caption: "English", antdLocale: {locale: 'en'}}}, 'en'));

export const useI18nStore = () => useContext(I18nStoreContext);

export interface I18nStoreProviderProps {
  children: React.ReactNode;
  defaultLocale: string;
  localeConfigs: Record<string, LocaleConfigOption>;
  store?: I18nStore;
}
export function I18nStoreProvider({store, defaultLocale, localeConfigs, children}: I18nStoreProviderProps) {
  const [i18nStore] = useState(() => store ?? new I18nStore(localeConfigs, defaultLocale));

  return <I18nStoreContext.Provider value={i18nStore}>{children}</I18nStoreContext.Provider>
}