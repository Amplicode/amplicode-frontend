import { Result } from "antd";
import {PropsWithChildren, useEffect, useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import { useAuth } from "react-oidc-context";
import {LoadingOutlined, LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {ID_TOKEN_STORAGE_KEY} from "./oidcConfig";

export function Auth({children}: PropsWithChildren<any>) {
  const auth = useAuth();

  const [init, setInit] = useState<boolean>(false);

  const {isLoading, activeNavigator, isAuthenticated, error, signinRedirect} = auth;

  useEffect(() => {
    console.log('*************');

    if (!init && !isAuthenticated && !isLoading && !activeNavigator && !error) {
      console.log('REDIRECT SIGN IN');
      setInit(true);
      void signinRedirect();
    }
  }, [activeNavigator, error, init, isAuthenticated, isLoading, signinRedirect]);

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return (
        <Result title={<FormattedMessage id='auth.signingIn' />}
                icon={<LoginOutlined/>}
        />
      );
    case 'signoutRedirect':
      return (
        <Result title={<FormattedMessage id='auth.signingOut' />}
                icon={<LogoutOutlined/>}
        />
      );
  }

  if (auth.isLoading) {
    return <Loading/>;
  }

  if (auth.error) {
    return (
      <Result title={<FormattedMessage id='auth.failed' />}
              subTitle={<FormattedMessage id='common.unknownAppError' />}
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
    <Result title={<FormattedMessage id='auth.loading' />}
            icon={<LoadingOutlined/>}
    />
  );
}