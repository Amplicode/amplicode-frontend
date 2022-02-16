import {DeleteOutlined} from "@ant-design/icons";
import {useIntl} from "react-intl";

/**
 * A button with "Delete" icon.
 * When clicked, executes provided callback.
 */
export function DeleteIconButton({onClick}: {onClick: () => void}) {
  const intl = useIntl();

  return (
    <DeleteOutlined
      key="delete"
      title={intl.formatMessage({ id: "common.remove" })}
      onClick={onClick}
    />
  );
}
