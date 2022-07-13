import React, {PropsWithChildren} from "react";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./oidcConfig";

export function SecurityProvider({children}: PropsWithChildren<any>) {
  return (
    <AuthProvider {...oidcConfig}>
      {children}
    </AuthProvider>
  );
}