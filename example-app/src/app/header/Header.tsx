import { Button, Modal, notification } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import "./Header.css";
import { observer } from "mobx-react";
import { useSecurityStore } from "../../core/security/security-context";
import { LocaleSelector } from "../../core/i18n/localeSelector/LocaleSelector";
import Logo from "./amplicode-logo.svg";
import {useLogoutMutation} from "../../api/restApi";
import {useAppDispatch} from "../../core/store/store";
import {setLoggedOut} from "../../core/security/securitySlice";

export const AppHeader = observer(() => {
  const intl = useIntl();

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: intl.formatMessage({ id: "auth.logout.confirm" }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: async () => {
        try {
          await logout({});
          dispatch(setLoggedOut());
        } catch (error) {
          if (axios.isAxiosError(error)) {
            notification.error({
              message: intl.formatMessage({ id: "auth.logout.unknownError" })
            });
          }
        }
      }
    });
  }, [intl, logout]);

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
