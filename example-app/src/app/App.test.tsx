import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import en from "../core/i18n/messages/en.json";
import { GRAPHQL_URI, REQUEST_SAME_ORIGIN } from "../config";
import { onError } from "@apollo/client/link/error";
import { act } from "react-dom/test-utils";
import { SecurityStore } from "../core/security/security";
import { SecurityContext } from "../core/security/security-context";

it("renders without crashing", () => {
  axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

  const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
    credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include"
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

  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <SecurityContext.Provider value={securityStore}>
            <IntlProvider locale="en" messages={en}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </IntlProvider>
          </SecurityContext.Provider>
        </ApolloProvider>
      </React.StrictMode>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
