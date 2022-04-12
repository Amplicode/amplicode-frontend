import { Button, Modal, notification, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import "./Header.css";
import { useHotkey } from "@amplicode/react-core";
import { HotkeyInfoModalButton } from "@amplicode/react-antd";
import { observer } from "mobx-react";
import { useSecurityStore } from "../../core/security/security-context";
import { KeyHandler } from "hotkeys-js";
import { toggleHotkeyInfoHotkeyConfig } from "../../core/hotkeys/hotkey-info-config";
import { LocaleSelector } from "../../core/i18n/localeSelector/LocaleSelector";

export const AppHeader = observer(() => {
  const intl = useIntl();
  const securityStore = useSecurityStore();

  const [visibleHotkeyInfo, setVisibleHotkeyInfo] = useState(false);

  const toggleHotkeyInfo = useCallback<KeyHandler>(
    () => setVisibleHotkeyInfo(!visibleHotkeyInfo),
    [visibleHotkeyInfo]
  );
  useHotkey(toggleHotkeyInfoHotkeyConfig, toggleHotkeyInfo);

  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: intl.formatMessage({ id: "auth.logout.confirm" }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: () => {
        securityStore.logout(status => {
          if (status !== 200) {
            notification.error({
              message: intl.formatMessage({ id: "auth.logout.unknownError" })
            });
          }
        });
      }
    });
  }, [intl, securityStore]);

  return (
    <div className="app-header">
      <Space className="app-header__user-panel">
        <LocaleSelector />
        <HotkeyInfoModalButton
          visible={visibleHotkeyInfo}
          setVisible={setVisibleHotkeyInfo}
        />
        <Button
          id="button_logout"
          className="app-header__icon-btn"
          type="text"
          icon={<LogoutOutlined />}
          onClick={showLogoutConfirm}
        />
      </Space>
    </div>
  );
});
