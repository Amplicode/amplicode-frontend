import {useIntl} from "react-intl";
import {useSecurityStore} from "../../core/security/security-context";
import {useCallback} from "react";
import {Button, Modal, notification} from "antd";
import axios from "axios";
import {LogoutOutlined} from "@ant-design/icons";
import { useAuth } from "react-oidc-context";

export function UserPanel() {
  const intl = useIntl();
  const securityStore = useSecurityStore();

  const auth = useAuth();

  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: intl.formatMessage({ id: "auth.logout.confirm" }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: async () => {
        const post_logout_redirect_uri = window.location.href;
        auth.signoutRedirect({post_logout_redirect_uri});
        // try {
        //   const response = await securityStore.logout();
        //   if (response.status !== 200) {
        //     notification.error({
        //       message: intl.formatMessage({ id: "auth.logout.unknownError" })
        //     });
        //   }
        // } catch (error) {
        //   if (axios.isAxiosError(error)) {
        //     notification.error({
        //       message: intl.formatMessage({ id: "auth.logout.unknownError" })
        //     });
        //   }
        // }
      }
    });
  }, [intl, securityStore]);

  return (
    <Button
      id="button_logout"
      className="app-header__icon-btn"
      type="text"
      icon={<LogoutOutlined />}
      onClick={showLogoutConfirm}
    />
  )
}