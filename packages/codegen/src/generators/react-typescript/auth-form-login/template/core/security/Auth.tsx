import { Result } from "antd";
import {PropsWithChildren, useEffect} from "react";
import {FormattedMessage} from "react-intl";
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import React from "react";
import { Loading } from "../feedback/Loading";
import {useSecurity} from "./useSecurity";
import { observer } from "mobx-react";
import {useAuth} from "react-oidc-context";
import {ID_TOKEN_STORAGE_KEY} from "./oidcConfig";
import { ErrorResponse } from "oidc-client-ts";

export const Auth = observer(({children}: PropsWithChildren<unknown>) => {
  const {login, checkSession} = useSecurity();

  const {isLoading, isAuthenticated, activeNavigator, error} = useAuth();

  console.log('isAuthenticated', isAuthenticated,
    'isLoading', isLoading,
    'error', error?.message, error?.name
    );

  useEffect(() => {
    if (isAuthenticated) {
      void checkSession();
    }
  }, [checkSession, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading && activeNavigator == null) {
      const noError = (error == null);
      const invalidGrant = (error instanceof ErrorResponse && error.error === 'invalid_grant');
      if (noError || invalidGrant) {
        void login();
      }
    }
  }, [activeNavigator, error, isAuthenticated, isLoading, login]);

  if (activeNavigator === 'signinSilent' || activeNavigator === 'signinRedirect') {
    return (
      <Result title={<FormattedMessage id='auth.signingIn' />}
              icon={<LoginOutlined/>}
      />
    );
  }

  if (activeNavigator === 'signoutRedirect') {
    return (
      <Result title={<FormattedMessage id='auth.signingOut' />}
              icon={<LogoutOutlined/>}
      />
    );
  }

  if (isLoading) {
    return <Loading/>;
  }

  if (error != null) {
    if (error instanceof ErrorResponse) {
      console.error(error.error);

      if (error.error === 'invalid_grant') {
        return (
          <Result title={<FormattedMessage id='auth.expired' />}
                  icon={<LoginOutlined/>}
          />
        );
      }
    }

    return (
      <Result title={<FormattedMessage id='auth.failed' />}
              subTitle={<FormattedMessage id='common.unknownAppError' />}
              status={'error'}
      />
    )
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Loading/>;
});

