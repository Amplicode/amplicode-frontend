import { useHotkeyStore } from '@amplicode/react-core';
import { MacCommandOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import { useIntl } from 'react-intl';
import { HotkeyInfo } from './HotkeyInfo';
import './HotkeyInfoModalButton.css';

export interface HotkeyInfoModalButtonProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
export const HotkeyInfoModalButton = observer(({
  visible,
  setVisible,
}: HotkeyInfoModalButtonProps) => {
  const intl = useIntl();
  const { hotkeyConfigs } = useHotkeyStore();

  return (
    <>
      <Button
        type="text"
        className="hotkeyInfoButton__iconBtn"
        icon={<MacCommandOutlined />}
        onClick={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        title={intl.formatMessage({ id: "hotkeys.hotkeyInfo.title" })}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <div className="hotkeyInfoButton__scrollContainer">
          <HotkeyInfo hotkeyConfigs={hotkeyConfigs} />
        </div>
      </Modal>
    </>
  );
});
