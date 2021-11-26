import { useLazyQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { localesStore } from "@amplicode/react-core";
import { IntlProvider } from "react-intl";
import {I18nProviderProps} from "./I18nProviderProps";
import { Spin } from "antd";
import "./ApiI18nProvider.css"

const MESSAGES = gql`
  query {
    persistentMessagesByLocales
  }
`;

export const ApiI18nProvider = (props: I18nProviderProps) => {
  const [loadMessages, { called, loading, data }] = useLazyQuery(MESSAGES, {
    onCompleted: () => null
  });
  const [localesAdded, setLocalesAdded] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    if (called && !loading) {
      addLocales(data.persistentMessagesByLocales)
      setLocalesAdded(true);
    }
  }, [called, loading]);

  return localesAdded ? (
    <IntlProvider messages={localesStore.messagesMapping[props.locale]} {...props}/>
  ) : (
    <div className="app__loading-container">
      <Spin/>
    </div>
  );
};

const addLocales = (locales: {[locale: string]: {[message: string]: string}}) => {
  Object.keys(locales).forEach(locale => {
    localesStore.addLocale({
      locale,
      caption: locale.toUpperCase(),
      messages: locales[locale],
    })
  })
}