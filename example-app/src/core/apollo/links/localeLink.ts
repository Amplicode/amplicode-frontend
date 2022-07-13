import {ApolloLink} from "@apollo/client";
import {i18nStore} from "../../i18n/providers/I18nProvider";

export const localeLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "accept-language": i18nStore.currentLocale || null
    }
  }));
  return forward(operation);
});