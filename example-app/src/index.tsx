import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  from
} from "@apollo/client";
import "antd/dist/antd.min.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { onError } from "@apollo/client/link/error";
import { GRAPHQL_URI, REQUEST_SAME_ORIGIN } from "./config";
import { EventEmitter } from "@amplicode/react-core";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { I18nProvider } from "./core/i18n/providers/I18nProvider";
import { i18nStore } from "./core/i18n/providers/I18nProvider";
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

const localeLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "accept-language": i18nStore.currentLocale || null
    }
  }));
  return forward(operation);
});

const client = new ApolloClient({
  link: from([localeLink, errorLink, httpLink]),
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SecurityContext.Provider value={securityStore}>
        <I18nProvider>
          <BrowserRouter>
            <ServerErrorInterceptor serverErrorEmitter={serverErrorEmitter}>
              <DevSupport
                ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
              >
                <App />
              </DevSupport>
            </ServerErrorInterceptor>
          </BrowserRouter>
        </I18nProvider>
      </SecurityContext.Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
