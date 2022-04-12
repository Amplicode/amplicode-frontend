import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./core/screen-api/screen-registry";
import App from "./app/App";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import "antd/dist/antd.min.css";
import axios from "axios";
import { HashRouter } from "react-router-dom";
import { onError } from "@apollo/client/link/error";
import { GRAPHQL_URI, REQUEST_SAME_ORIGIN } from "./config";
import {
  HotkeyContext,
  HotkeyStore,
  ScreenContext,
  Screens,
  EventEmitter
} from "@amplicode/react-core";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { defaultHotkeyConfigs } from "./core/hotkeys/hotkey-configs";
import "./core/addons/addons";
import { I18nProvider } from "./core/i18n/providers/I18nProvider";
import { ServerErrorInterceptor } from "./core/error/ServerErrorInterceptor";
import { ServerErrorEvents } from "./core/error/ServerErrorEvents";
import { SecurityStore } from "./core/security/security";
import { SecurityContext } from "./core/security/security-context";

export const serverErrorEmitter = new EventEmitter<ServerErrorEvents>();

axios.interceptors.response.use(response => {
  if (response.status === 401) {
    serverErrorEmitter.emit("unauthorized");
  }
  return response;
});
axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
  credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include"
});

const errorLink = onError(errorResponse =>
  serverErrorEmitter.emit("graphQLError", errorResponse)
);

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only"
    },
    watchQuery: {
      fetchPolicy: "network-only"
    }
  }
});

const securityStore = new SecurityStore(client);

// To customize screens behavior, pass a config object to Screens constructor
const screens = new Screens();

const hotkeys = new HotkeyStore(defaultHotkeyConfigs);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SecurityContext.Provider value={securityStore}>
        <I18nProvider>
          <ScreenContext.Provider value={screens}>
            <HashRouter>
              <HotkeyContext.Provider value={hotkeys}>
                <ServerErrorInterceptor serverErrorEmitter={serverErrorEmitter}>
                  <DevSupport
                    ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
                  >
                    <App />
                  </DevSupport>
                </ServerErrorInterceptor>
              </HotkeyContext.Provider>
            </HashRouter>
          </ScreenContext.Provider>
        </I18nProvider>
      </SecurityContext.Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
