import React, { ReactNode } from "react";
import { Modal } from "antd";
import { useIntl } from "react-intl";

interface Props {
  contentComponent: ReactNode,
  title: ReactNode,
  okText?: ReactNode,
  cancelText?: ReactNode,
}

export const CloseCurrentScreen: React.FC<Props> = ({
  contentComponent,
  title,
  okText,
  cancelText
}) => {
  const intl = useIntl();
    Modal.confirm({
      content: contentComponent,
      title,
      okText: okText ?? intl.formatMessage({ id: "common.ok" }),
      cancelText: cancelText ?? intl.formatMessage({ id: "common.cancel" }),
      onOk: () => {},
      onCancel: () => {}
    });

  return null;
}
