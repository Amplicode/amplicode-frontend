import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import {FormattedMessage, useIntl } from "react-intl";
import React  from "react";
import { Link, useLocation } from "react-router-dom";

export const AppMenu = () => {
  const intl = useIntl();
  const location = useLocation();
  const {pathname} = location;
  const selectedKey = toSelectedKey(pathname);

  return (
    <Menu selectedKeys={[selectedKey]}>
      <Menu.Item title={intl.formatMessage({id: 'screen.home'})}
                 key={'/'}
                 icon={<HomeOutlined />}
      >
        <Link to={'/'}>
          <FormattedMessage id={'screen.home'} />
        </Link>
      </Menu.Item>
    </Menu>
  );
};

function toSelectedKey(pathname: string) {
  return '/' + pathname.split('/', 2).join('');
}
