import {CheckOutlined} from "@ant-design/icons";
import {useIntl} from "react-intl";

/**
 * A button with "Select" icon.
 * When clicked, executes provided callback.
 */
export function SelectIconButton({onClick}: {onClick: () => void}) {
  const intl = useIntl();

  return (
    <CheckOutlined
      key="select"
      title={intl.formatMessage({
        id: "EntityLookupField.selectEntityInstance"
      })}
      onClick={onClick}
    />
  );
}