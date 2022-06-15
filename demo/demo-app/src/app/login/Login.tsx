import React, { ChangeEvent, useCallback, useState, useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import "./Login.css";
import { FormattedMessage, useIntl } from "react-intl";
import { useSecurityStore } from "../../core/security/security-context";
import { LocaleSelector } from "../../core/i18n/localeSelector/LocaleSelector";

export const Login = observer(() => {
  const intl = useIntl();
  const securityStore = useSecurityStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [performingLoginRequest, setPerformingLoginRequest] = useState(false);

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
    setPerformingLoginRequest(true);
    try {
      const response = await securityStore.login(username, password);
      switch (response.status) {
        case 200:
          break;
        default:
          notification.error({
            message: intl.formatMessage({ id: "auth.login.unknownError" })
          });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.data.status) {
          case 401:
            notification.error({
              message: intl.formatMessage({ id: "auth.login.unauthorized" })
            });
            break;
          default:
            notification.error({
              message: intl.formatMessage({ id: "auth.login.unknownError" })
            });
        }
      }
    }
    setPerformingLoginRequest(false);
  }, [securityStore, username, password, intl]);

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
              loading={performingLoginRequest}
            >
              <FormattedMessage id="auth.login.submit" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
