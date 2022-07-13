import {ApolloClient, from, InMemoryCache} from "@apollo/client";
import {authLink} from "./links/authLink";
import {localeLink} from "./links/localeLink";
import {errorLink} from "./links/errorLink";
import {httpLink} from "./links/httpLink";

export const client = new ApolloClient({
  link: from([authLink, localeLink, errorLink, httpLink]),
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