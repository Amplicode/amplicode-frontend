import {Drawer, Input, notification} from "antd";
import {CloseCircleOutlined, LinkOutlined} from "@ant-design/icons";
import React, {useCallback, useState} from "react";
import './EntityLookupField.css';

export interface EntityLookupFieldProps {
  value?: Record<string, unknown>;
  onChange?: (value: this['value']) => void;
  lookupComponent?: JSX.Element;
  getDisplayName: (value: Record<string, unknown>) => string;
  label: string;
  hideClearButton?: boolean;
  autoFocus?: boolean;
}

export function EntityLookupField(props: EntityLookupFieldProps) {
  const {value, onChange, lookupComponent, getDisplayName, label, autoFocus} = props;

  const [lookupComponentVisible, setLookupComponentVisible] = useState<boolean>(false);

  const handleClear = useCallback(() => {
    if (onChange != null) {
      onChange(undefined);
    }
  }, [onChange]);

  const onSelect = (entityInstance: Record<string, unknown>) => {
    if (onChange != null) {
      onChange(entityInstance);
    }
    setLookupComponentVisible(false);
  };

  const handleClick = useCallback(() => {
    if (lookupComponent == null) {
      notification.warn({message: `Please define lookup screen for reference field "${label}"`});
      return;
    }

    setLookupComponentVisible(true);
  }, [setLookupComponentVisible, lookupComponent, label]);

  return (
    <>
      <Input
        className='entity-lookup-field'
        onClick={handleClick}
        prefix={<LinkOutlined onClick={handleClick} />}
        suffix={value != null && props.hideClearButton !== true && <CloseCircleOutlined onClick={handleClear} />}
        value={value ? getDisplayName(value) : ''}
        autoFocus={autoFocus}
      />
      <Drawer visible={lookupComponentVisible}
              title={label}
              onClose={() => setLookupComponentVisible(false)}
              width="90%"
      >
        {lookupComponent && React.cloneElement(lookupComponent, {onSelect})}
      </Drawer>
    </>
  );
}
