import React from "react";
import { IntlProvider } from "react-intl";
import { localesStore } from "@amplicode/react-core";
import "./localI18nInit";
import { I18nProviderProps } from "./I18nProviderProps";

export const LocalI18nProvider = (props: I18nProviderProps) => {
  return (
    <IntlProvider
      messages={localesStore.messagesMapping[props.locale]}
      {...props}
    />
  );
};
