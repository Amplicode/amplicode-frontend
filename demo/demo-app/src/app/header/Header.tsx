import { Button, Modal, notification, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import "./Header.css";
import { observer } from "mobx-react";
import { useSecurityStore } from "../../core/security/security-context";
import { LocaleSelector } from "../../core/i18n/localeSelector/LocaleSelector";
import Logo from "./amplicode-logo.svg";

export const AppHeader = observer(() => {
  const intl = useIntl();
  const securityStore = useSecurityStore();

  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: intl.formatMessage({ id: "auth.logout.confirm" }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: async () => {
        try {
          const response = await securityStore.logout();
          if (response.status !== 200) {
            notification.error({
              message: intl.formatMessage({ id: "auth.logout.unknownError" })
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            notification.error({
              message: intl.formatMessage({ id: "auth.logout.unknownError" })
            });
          }
        }
      }
    });
  }, [intl, securityStore]);

  return (
    <div className="app-header">
      <div className="app-header__app-logo">
        <img src={Logo} alt="Amplicode" />
      </div>
      <div className="app-header__user-panel">
        <LocaleSelector />
        <Button
          id="button_logout"
          className="app-header__icon-btn"
          type="text"
          icon={<LogoutOutlined />}
          onClick={showLogoutConfirm}
        />
      </div>
    </div>
  );
});
