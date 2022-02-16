import {PlusOutlined} from "@ant-design/icons";
import {FormattedMessage, useIntl} from "react-intl";
import {Button} from "antd";

/**
 * A button labeled "Create".
 * When clicked, executes provided callback.
 */
export function CreateButton({onClick}: {onClick: () => void}) {
  const intl = useIntl();

  return (
    <Button
      htmlType="button"
      key="create"
      title={intl.formatMessage({id: "common.create"})}
      type="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
    >
      <span>
        <FormattedMessage id="common.create" />
      </span>
    </Button>
  );
}