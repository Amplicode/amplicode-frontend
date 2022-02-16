import {FormattedMessage, useIntl} from "react-intl";
import {useScreens} from "@amplicode/react-core";
import {Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";

/**
 * A button labeled "Close".
 * When clicked, closes the current screen.
 */
export function CloseScreenButton() {
  const intl = useIntl();
  const screens = useScreens();

  return (
    <Button
      htmlType="button"
      key="close"
      title={intl.formatMessage({id: "common.close"})}
      type="primary"
      icon={<CloseOutlined />}
      onClick={screens.closeActiveBreadcrumb}
    >
      <span>
        <FormattedMessage id="common.close" />
      </span>
    </Button>
  );
}