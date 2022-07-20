import React, {PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {AuthProvider, useAuth} from "react-oidc-context";
import {ID_TOKEN_STORAGE_KEY, oidcConfig} from "./oidcConfig";
import {SecurityContext} from "./SecurityContext";
import {SecurityStore} from "./SecurityStore";
import {useApolloClient} from "@apollo/client";
import {Loading} from "../feedback/Loading";
import {User} from "oidc-client-ts";
import {useSecurity} from "./useSecurity";
import {resolvePath, useLocation, useNavigate} from "react-router-dom";

export function SecurityProvider({children}: PropsWithChildren<unknown>) {
  return (
    <OIDCAuthProvider>
      <SecurityStoreProvider>
        {children}
      </SecurityStoreProvider>
    </OIDCAuthProvider>
  );
}

function SecurityStoreProvider({children}: PropsWithChildren<unknown>) {
  const client = useApolloClient();
  const auth = useAuth();

  const [securityStore, setSecurityStore] = useState<SecurityStore | undefined>();

  useEffect(() => {
    if (securityStore == null) {
      setSecurityStore(new SecurityStore(client, auth));
    }
  }, [auth, client, securityStore]);

  if (securityStore == null) {
    return <Loading/>;
  }

  return (
    <SecurityContext.Provider value={securityStore}>
      {children}
    </SecurityContext.Provider>
  );
}

function OIDCAuthProvider({children}: PropsWithChildren<unknown>) {
  const location = useLocation();
  const return_path = encodeURIComponent(location.pathname + location.search + location.hash);
  const authPath = resolvePath('auth').pathname;
  const redirect_uri = `${window.location.origin}${authPath}?return_path=${return_path}`;

  const navigate = useNavigate();
  const handleSignin = useCallback(
    async (user: void | User) => {
      if (user == null || user?.id_token == null) {
        throw new Error('id token not found');
      }
      await saveToken(user.id_token);
      const navigateTarget = new URLSearchParams(window.location.search).get('return_path');
      if (navigateTarget == null) {
        console.error('Redirect URI does not contain return_path. Navigating to root path.')
        navigate('/');
        return;
      }
      navigate(decodeURIComponent(navigateTarget));
    },
    [navigate]
  );

  return (
    <AuthProvider {...oidcConfig}
                  redirect_uri={redirect_uri}
                  onSigninCallback={handleSignin}
    >
      {children}
    </AuthProvider>
  );
}

async function saveToken(token: string) {
  await localStorage.setItem(ID_TOKEN_STORAGE_KEY, token);
}
