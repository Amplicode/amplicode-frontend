import { setContext } from '@apollo/client/link/context';
import {oidcConfig} from "../../security/oidcConfig";

export const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(`oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});