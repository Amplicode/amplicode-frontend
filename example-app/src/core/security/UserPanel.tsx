import {useIntl} from "react-intl";
import {useCallback} from "react";
import {Button, Modal} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useSecurity} from "./useSecurity";

export function UserPanel() {
  const intl = useIntl();
  const {logout} = useSecurity();

  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: intl.formatMessage({ id: "auth.logout.confirm" }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: async () => {
        await logout();
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
  }, [intl, logout]);

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