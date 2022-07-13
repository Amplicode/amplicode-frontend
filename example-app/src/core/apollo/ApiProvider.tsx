import {ApolloProvider} from "@apollo/client";
import React, {PropsWithChildren} from "react";
import {client} from "./client";

export function ApiProvider({children}: PropsWithChildren<any>) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}