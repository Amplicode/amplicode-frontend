import {EditOutlined} from "@ant-design/icons";
import {useIntl} from "react-intl";

/**
 * A button with "Edit" icon.
 * When clicked, executes provided callback.
 */
export function EditIconButton({onClick}: {onClick: () => void}) {
  const intl = useIntl();

  return (
    <EditOutlined
      key="edit"
      title={intl.formatMessage({ id: "common.edit" })}
      onClick={onClick}
    />
  );
}