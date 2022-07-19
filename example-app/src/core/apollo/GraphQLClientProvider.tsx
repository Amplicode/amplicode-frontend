import {ApolloClient, ApolloProvider} from "@apollo/client";
import React, {PropsWithChildren, useEffect, useState} from "react";
import { Loading } from "../feedback/Loading";
import {createClient} from "./client";

export function GraphQLClientProvider({children}: PropsWithChildren<any>) {
  const [client, setClient] = useState<ApolloClient<any> | undefined>();

  useEffect(() => {
    if (client == null) {
      setClient(createClient());
    }
  }, [client])

  if (client == null) {
    return <Loading/>;
  }

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}