import { observer } from "mobx-react";
import { IntlProvider } from "react-intl";
import { useI18nStore } from "@amplicode/react";

export interface I18nApiProviderProps {
  children: React.ReactNode;
}
export const I18nApiProvider = observer(
  ({ children }: I18nApiProviderProps) => {
    const { currentMessages, currentLocale } = useI18nStore();

    return (
      <IntlProvider locale={currentLocale} messages={currentMessages}>
        {children}
      </IntlProvider>
    );
  }
);
