import { Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const menuItems: ItemType[] = [
  {
    label: (
      <Link to={""}>
        <FormattedMessage id={"screen.home"} />
      </Link>
    ),
    key: "",
    icon: <HomeOutlined />
  }
];

export const AppMenu = () => {
  const { pathname } = useLocation();
  const selectedKey = toSelectedKey(pathname);

  return <Menu selectedKeys={[selectedKey]} items={menuItems} />;
};

function toSelectedKey(pathname: string) {
  return pathname.split("/", 2).join("");
}
