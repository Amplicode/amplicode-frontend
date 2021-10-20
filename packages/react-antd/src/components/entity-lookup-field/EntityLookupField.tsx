import {Input, notification} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {useCallback} from "react";
import {useIntl} from "react-intl";
import {ReactComponent, useScreens} from "@amplicode/react-core";

export interface EntityLookupFieldProps {
  value?: Record<string, unknown>;
  onChange?: (value: this['value']) => void;
  listComponent?: ReactComponent;
  listComponentProps?: Record<string, unknown>;
  getDisplayName: (value: Record<string, unknown>) => string;
  label: string;
}

export function EntityLookupField(props: EntityLookupFieldProps) {
  const {value, onChange, listComponent, listComponentProps, getDisplayName, label} = props;

  const screens = useScreens();
  const intl = useIntl();

  const handleClick = useCallback(() => {
    const enableSelectModeProps = {
      onSelect: (entityInstance: Record<string, unknown>) => {
        if (onChange != null) {
          onChange(entityInstance);
        }
      }
    };

    if (listComponent == null) {
      notification.warn({message: `Please define lookup screen for reference field "${label}"`});
      return;
    }

    const caption = intl.formatMessage({
      id: "EntityLookupField.selectEntityInstance"
    });

    screens.openInBreadcrumb({
      breadcrumbCaption: caption,
      component: listComponent,
      props: {
        ...enableSelectModeProps,
        ...listComponentProps
      }
    });
  }, [onChange, listComponent, intl, label, listComponentProps, screens]);

  return (
    <Input prefix={<LinkOutlined />}
           onClick={handleClick}
           value={value ? getDisplayName(value) : ''}
    />
  );
}
