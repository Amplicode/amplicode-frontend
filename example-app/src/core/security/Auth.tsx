import { Result } from "antd";
import {PropsWithChildren, useEffect, useState} from "react";
import { useIntl } from "react-intl";
import { useAuth } from "react-oidc-context";
import {LoadingOutlined, LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {ID_TOKEN_STORAGE_KEY} from "./oidcConfig";

export function Auth({children}: PropsWithChildren<any>) {
  const auth = useAuth();
  const intl = useIntl();

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
      return (
        <Result title={intl.formatMessage({id: 'auth.signingIn'})}
                icon={<LoginOutlined/>}
        />
      );
    case 'signoutRedirect':
      return (
        <Result title={intl.formatMessage({id: 'auth.signingOut'})}
                icon={<LogoutOutlined/>}
        />
      );
  }

  if (auth.isLoading) {
    return <Loading/>;
  }

  if (auth.error) {
    return (
      <Result title={intl.formatMessage({id: 'auth.failed'})}
              subTitle={intl.formatMessage({id: 'common.unknownAppError'})}
              status={'error'}
      />
    )
  }

  if (auth.isAuthenticated) {
    // We need to wait until onSigninCallback puts the token into local storage, so that it can be picked up by Apollo Client's authLink
    if (!localStorage.getItem(ID_TOKEN_STORAGE_KEY)) {
      return <Loading/>;
    }

    return children;
  }

  return <Loading/>;
}

function Loading() {
  const intl = useIntl();

  return (
    <Result title={intl.formatMessage({id: 'auth.loading'})}
            icon={<LoadingOutlined/>}
    />
  );
}