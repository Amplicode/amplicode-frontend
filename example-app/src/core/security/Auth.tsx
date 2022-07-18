import { Result } from "antd";
import {PropsWithChildren, useEffect} from "react";
import {FormattedMessage} from "react-intl";
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import React from "react";
import { Loading } from "../feedback/Loading";
import {useSecurity} from "./useSecurity";
import { observer } from "mobx-react";

export const Auth = observer(({children}: PropsWithChildren<unknown>) => {
  const {isLoggedIn, isInProgress, isLoading, isSigningIn, isSigningOut, error, login, checkSession} = useSecurity();

  useEffect(() => {
    if (isLoggedIn) {
      void checkSession();
    }
  }, [checkSession, isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn && !isInProgress && error == null) {
      void login();
    }
  }, [error, isInProgress, isLoggedIn, login]);

  if (isSigningIn) {
    return (
      <Result title={<FormattedMessage id='auth.signingIn' />}
              icon={<LoginOutlined/>}
      />
    );
  }

  if (isSigningOut) {
    return (
      <Result title={<FormattedMessage id='auth.signingOut' />}
              icon={<LogoutOutlined/>}
      />
    );
  }

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    console.error(error);
    return (
      <Result title={<FormattedMessage id='auth.failed' />}
              subTitle={<FormattedMessage id='common.unknownAppError' />}
              status={'error'}
      />
    )
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <Loading/>;
});

