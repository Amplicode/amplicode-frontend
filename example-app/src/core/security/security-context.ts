import { createContext, useContext } from "react";
import { SecurityStore } from "./security";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({ cache: new InMemoryCache() });

export const SecurityContext = createContext(new SecurityStore(client));

export function useSecurityStore(): SecurityStore {
  return useContext(SecurityContext);
}
