import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import {
  HotkeyContext,
  HotkeyStore,
  ScreenContext,
  Screens
} from "@amplicode/react-core";
import { defaultHotkeyConfigs } from "../hotkeyConfigs";
import { GRAPHQL_URI, REQUEST_SAME_ORIGIN } from "../config";
import { onError } from "@apollo/client/link/error";
import { act } from "react-dom/test-utils";
import { securityStore } from "../security-store";
import "./screenRegistry";
<% if (i18nApi === "true") { -%>
  import {ApiI18nProvider as I18nProvider} from "../i18n/ApiI18nProvider";
<% } else { -%>
  import {LocalI18nProvider as I18nProvider} from "../i18n/LocalI18nProvider";
<% } -%>

it("renders without crashing", () => {
  const screens = new Screens();

  const hotkeys = new HotkeyStore(defaultHotkeyConfigs);

  axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

  const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
    credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include",
  });

  const logoutLink = onError(({ networkError }) => {
    if (networkError == null || !("statusCode" in networkError)) {
      return;
    }
    if (networkError.statusCode === 401) {
      securityStore.logout();
    }
  });

  const client = new ApolloClient({
    link: logoutLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false
    }),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only"
      },
      watchQuery: {
        fetchPolicy: "cache-and-network"
      }
    }
  });

  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <I18nProvider locale="en">
            <ScreenContext.Provider value={screens}>
              <HashRouter>
                <HotkeyContext.Provider value={hotkeys}>
                  <App />
                </HotkeyContext.Provider>
              </HashRouter>
            </ScreenContext.Provider>
          </I18nProvider>
        </ApolloProvider>
      </React.StrictMode>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
