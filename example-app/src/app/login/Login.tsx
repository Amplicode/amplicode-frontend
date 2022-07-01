import React, { ChangeEvent, useCallback, useState, useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import "./Login.css";
import { FormattedMessage, useIntl } from "react-intl";
import { useSecurityStore } from "../../core/security/security-context";
import { LocaleSelector } from "../../core/i18n/localeSelector/LocaleSelector";
import {useLoginMutation} from "../../api/restApi";
import qs from "qs";
import {useAppDispatch} from "../../core/store/store";
import {setLoggedIn} from "../../core/security/securitySlice";

export const Login = observer(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, {isLoading}] = useLoginMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setUsername("admin");
      setPassword("admin");
    }
  }, []);

  const changeLogin = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    [setUsername]
  );
  const changePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    [setPassword]
  );

  const doLogin = useCallback(async () => {
      const response = await login(qs.stringify({username, password}));
      if ('error' in response) {
        notification.error({
          message: response.error
        });
        return;
      }
      dispatch(setLoggedIn());
  }, [dispatch, login, password, username]);

  return (
    <div className="login-form-container">
      <div className="login-form">
        <div className="title">jmix2-petclinic</div>
        <Form layout="vertical" onFinish={doLogin}>
          <Form.Item>
            <Input
              id="input_login"
              placeholder="Login"
              onChange={changeLogin}
              value={username}
              prefix={<UserOutlined className="login-icon" />}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Input
              id="input_password"
              placeholder="Password"
              onChange={changePassword}
              value={password}
              type="password"
              prefix={<LockOutlined className="login-icon" />}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <div className="language-switcher-container">
              <LocaleSelector />
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block={true}
              loading={isLoading}
            >
              <FormattedMessage id="auth.login.submit" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
