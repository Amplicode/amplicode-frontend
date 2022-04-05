import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import { useCallback } from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";
import { useScreens, getScreenKey, screenStore } from "@amplicode/react-core";
import { AddonsMenu } from "@amplicode/react-antd";

export const AppMenu = observer(() => {
  const intl = useIntl();
  const screens = useScreens();
  const location = useLocation();

  const handleClick = useCallback(
    ({ key }: { key: string }) => {
      const menuItemInfo = screenStore.screenRegistry[key];
      if (menuItemInfo == null) {
        // This might be a menu item that doesn't use Screen API
        return;
      }
      const tabCaption = intl.formatMessage({ id: menuItemInfo.captionKey });
      const breadcrumbCaption = intl.formatMessage({
        id: menuItemInfo.captionKey
      });
      const { component } = menuItemInfo;

      screens.openInTab({
        tabCaption,
        breadcrumbCaption,
        component,
        tabKey: key
      });
    },
    [intl, screens]
  );

  const getCaption = useCallback(
    (key: string) => {
      return intl.formatMessage({
        id: screenStore.screenRegistry[key].captionKey
      });
    },
    [intl]
  );

  const activeItem = getScreenKey(location.pathname);

  return (
    <Menu onClick={handleClick} selectedKeys={activeItem ? [activeItem] : []}>
      <Menu.Item icon={<HomeOutlined />} title={getCaption("home")} key="home">
        {getCaption("home")}
      </Menu.Item>
      <Menu.Item title={getCaption("owner-cards")} key="owner-cards">
        {getCaption("owner-cards")}
      </Menu.Item>
      <Menu.Item title={getCaption("owner-list")} key="owner-list">
        {getCaption("owner-list")}
      </Menu.Item>
      <Menu.Item title={getCaption("owner-table")} key="owner-table">
        {getCaption("owner-table")}
      </Menu.Item>
      <Menu.Item title={getCaption("pet-cards")} key="pet-cards">
        {getCaption("pet-cards")}
      </Menu.Item>
      <Menu.Item title={getCaption("pet-list")} key="pet-list">
        {getCaption("pet-list")}
      </Menu.Item>
      <Menu.Item title={getCaption("pet-table")} key="pet-table">
        {getCaption("pet-table")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("read-only-owner-cards")}
        key="read-only-owner-cards"
      >
        {getCaption("read-only-owner-cards")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("read-only-owner-table")}
        key="read-only-owner-table"
      >
        {getCaption("read-only-owner-table")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("read-only-owner-list")}
        key="read-only-owner-list"
      >
        {getCaption("read-only-owner-list")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("read-only-pet-cards")}
        key="read-only-pet-cards"
      >
        {getCaption("read-only-pet-cards")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("read-only-pet-table")}
        key="read-only-pet-table"
      >
        {getCaption("read-only-pet-table")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("read-only-pet-list")}
        key="read-only-pet-list"
      >
        {getCaption("read-only-pet-list")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("standalone-owner-cards")}
        key="standalone-owner-cards"
      >
        {getCaption("standalone-owner-cards")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("standalone-owner-table")}
        key="standalone-owner-table"
      >
        {getCaption("standalone-owner-table")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("standalone-owner-list")}
        key="standalone-owner-list"
      >
        {getCaption("standalone-owner-list")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("standalone-owner-editor")}
        key="standalone-owner-editor"
      >
        {getCaption("standalone-owner-editor")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("owner-lookup-cards")}
        key="owner-lookup-cards"
      >
        {getCaption("owner-lookup-cards")}
      </Menu.Item>
      <Menu.Item title={getCaption("pet-lookup-cards")} key="pet-lookup-cards">
        {getCaption("pet-lookup-cards")}
      </Menu.Item>
      <Menu.Item
        title={getCaption("pet-type-lookup-cards")}
        key="pet-type-lookup-cards"
      >
        {getCaption("pet-type-lookup-cards")}
      </Menu.Item>
      <AddonsMenu key={"addonsMenu"} />
      {/*If you don't need Screen API (tabs / breadcrumbs) you can just use React Router components*/}
      {/*<Menu.Item*/}
      {/*  title='Component1'*/}
      {/*  key='component1'*/}
      {/*>*/}
      {/*  <Link to='/component1'>Component 1</Link>*/}
      {/*</Menu.Item>*/}
    </Menu>
  );
});
