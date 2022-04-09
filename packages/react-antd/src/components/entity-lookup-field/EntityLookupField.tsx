import {Input, notification} from "antd";
import {CloseCircleOutlined, LinkOutlined} from "@ant-design/icons";
import {useCallback} from "react";
import {useIntl} from "react-intl";
import {ReactComponent, useScreens} from "@amplicode/react-core";
import './EntityLookupField.css';

export interface EntityLookupFieldProps {
  value?: Record<string, unknown>;
  onChange?: (value: this['value']) => void;
  lookupComponent?: ReactComponent;
  lookupComponentProps?: Record<string, unknown>;
  getDisplayName: (value: Record<string, unknown>) => string;
  label: string;
  hideClearButton?: boolean;
}

export function EntityLookupField(props: EntityLookupFieldProps) {
  const {value, onChange, lookupComponent, lookupComponentProps, getDisplayName, label} = props;

  const screens = useScreens();
  const intl = useIntl();

  const handleClear = useCallback(() => {
    if (onChange != null) {
      onChange(undefined);
    }
  }, [onChange]);

  const handleClick = useCallback(() => {
    const enableSelectModeProps = {
      onSelect: (entityInstance: Record<string, unknown>) => {
        if (onChange != null) {
          onChange(entityInstance);
        }
      }
    };

    if (lookupComponent == null) {
      notification.warn({message: `Please define lookup screen for reference field "${label}"`});
      return;
    }

    const caption = intl.formatMessage({
      id: "EntityLookupField.selectEntityInstance"
    }, {label});

    screens.openInBreadcrumb({
      breadcrumbCaption: caption,
      component: lookupComponent,
      props: {
        ...enableSelectModeProps,
        ...lookupComponentProps
      }
    });
  }, [onChange, lookupComponent, intl, label, lookupComponentProps, screens]);

  return (
    <Input
      className='entity-lookup-field'
      onClick={handleClick}
      prefix={<LinkOutlined onClick={handleClick} />}
      suffix={value != null && props.hideClearButton !== true && <CloseCircleOutlined onClick={handleClear} />}
      value={value ? getDisplayName(value) : ''}
    />
  );
}
