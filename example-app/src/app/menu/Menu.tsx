import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const AppMenu = () => {
  const intl = useIntl();
  const location = useLocation();
  const { pathname } = location;
  const selectedKey = toSelectedKey(pathname);

  return (
    <Menu selectedKeys={[selectedKey]}>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.home" })}
        key={"/"}
        icon={<HomeOutlined />}
      >
        <Link to={"/"}>
          <FormattedMessage id={"screen.home"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.OwnerCards" })}
        key={"/owner-cards"}
      >
        <Link to={"/owner-cards"}>
          <FormattedMessage id={"screen.OwnerCards"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.OwnerList" })}
        key={"/owner-list"}
      >
        <Link to={"/owner-list"}>
          <FormattedMessage id={"screen.OwnerList"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.OwnerTable" })}
        key={"/owner-table"}
      >
        <Link to={"/owner-table"}>
          <FormattedMessage id={"screen.OwnerTable"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.OwnerCardsWithFilter" })}
        key={"/owner-cards-with-filter"}
      >
        <Link to={"/owner-cards-with-filter"}>
          <FormattedMessage id={"screen.OwnerCardsWithFilter"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.PetCards" })}
        key={"/pet-cards"}
      >
        <Link to={"/pet-cards"}>
          <FormattedMessage id={"screen.PetCards"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.PetList" })}
        key={"/pet-list"}
      >
        <Link to={"/pet-list"}>
          <FormattedMessage id={"screen.PetList"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.PetTable" })}
        key={"/pet-table"}
      >
        <Link to={"/pet-table"}>
          <FormattedMessage id={"screen.PetTable"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.TestScalarsCards" })}
        key={"/scalars-cards"}
      >
        <Link to={"/scalars-cards"}>
          <FormattedMessage id={"screen.TestScalarsCards"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.TestScalarsTable" })}
        key={"/scalars-table"}
      >
        <Link to={"/scalars-table"}>
          <FormattedMessage id={"screen.TestScalarsTable"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.TestNotNullScalarsCards" })}
        key={"/notnull-scalars-cards"}
      >
        <Link to={"/notnull-scalars-cards"}>
          <FormattedMessage id={"screen.TestNotNullScalarsCards"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.ReadOnlyOwnerCards" })}
        key={"/read-only-owner-cards"}
      >
        <Link to={"/read-only-owner-cards"}>
          <FormattedMessage id={"screen.ReadOnlyOwnerCards"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.ReadOnlyOwnerTable" })}
        key={"/read-only-owner-table"}
      >
        <Link to={"/read-only-owner-table"}>
          <FormattedMessage id={"screen.ReadOnlyOwnerTable"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.ReadOnlyOwnerList" })}
        key={"/read-only-owner-list"}
      >
        <Link to={"/read-only-owner-list"}>
          <FormattedMessage id={"screen.ReadOnlyOwnerList"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.ReadOnlyPetCards" })}
        key={"/read-only-pet-cards"}
      >
        <Link to={"/read-only-pet-cards"}>
          <FormattedMessage id={"screen.ReadOnlyPetCards"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.ReadOnlyPetTable" })}
        key={"/read-only-pet-table"}
      >
        <Link to={"/read-only-pet-table"}>
          <FormattedMessage id={"screen.ReadOnlyPetTable"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.ReadOnlyPetList" })}
        key={"/read-only-pet-list"}
      >
        <Link to={"/read-only-pet-list"}>
          <FormattedMessage id={"screen.ReadOnlyPetList"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.ReadOnlyScalarsList" })}
        key={"/read-only-scalars-list"}
      >
        <Link to={"/read-only-scalars-list"}>
          <FormattedMessage id={"screen.ReadOnlyScalarsList"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.StandaloneOwnerCards" })}
        key={"/standalone-owner-cards"}
      >
        <Link to={"/standalone-owner-cards"}>
          <FormattedMessage id={"screen.StandaloneOwnerCards"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.StandaloneOwnerTable" })}
        key={"/standalone-owner-table"}
      >
        <Link to={"/standalone-owner-table"}>
          <FormattedMessage id={"screen.StandaloneOwnerTable"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.StandaloneOwnerList" })}
        key={"/standalone-owner-list"}
      >
        <Link to={"/standalone-owner-list"}>
          <FormattedMessage id={"screen.StandaloneOwnerList"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.StandaloneOwnerEditor" })}
        key={"/standalone-owner-editor"}
      >
        <Link to={"/standalone-owner-editor"}>
          <FormattedMessage id={"screen.StandaloneOwnerEditor"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.OwnerLookup" })}
        key={"/owner-lookup-cards"}
      >
        <Link to={"/owner-lookup-cards"}>
          <FormattedMessage id={"screen.OwnerLookup"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.PetLookup" })}
        key={"/pet-lookup-cards"}
      >
        <Link to={"/pet-lookup-cards"}>
          <FormattedMessage id={"screen.PetLookup"} />
        </Link>
      </Menu.Item>
      <Menu.Item
        title={intl.formatMessage({ id: "screen.PetTypeLookup" })}
        key={"/pet-type-lookup-cards"}
      >
        <Link to={"/pet-type-lookup-cards"}>
          <FormattedMessage id={"screen.PetTypeLookup"} />
        </Link>
      </Menu.Item>
    </Menu>
  );
};

function toSelectedKey(pathname: string) {
  return "/" + pathname.split("/", 2).join("");
}
