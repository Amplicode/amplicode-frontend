import {PropsWithChildren, useEffect, useState} from "react";
import { useAuth } from "react-oidc-context";

export function Auth({children}: PropsWithChildren<any>) {
  const auth = useAuth();

  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  useEffect(() => {
    const {isLoading, activeNavigator, isAuthenticated, error} = auth;
    if (!loggingIn && !isAuthenticated && !isLoading && !activeNavigator && !error) {
      setLoggingIn(true);
      auth.signinRedirect().then(() => {
        setLoggingIn(false);
      })
    }
  }, [auth, loggingIn]);

  switch (auth.activeNavigator) {
    case 'signinSilent':
      // TODO
      return 'Signing in...';
    case 'signoutRedirect':
      // TODO
      return 'Signing out...';
  }

  if (auth.isLoading) {
    // TODO
    return 'Loading...';
  }

  if (auth.error) {
    // TODO
    return 'Error...';
  }

  if (auth.isAuthenticated) {
    return children;
  }

  return 'Unexpected auth state';
}