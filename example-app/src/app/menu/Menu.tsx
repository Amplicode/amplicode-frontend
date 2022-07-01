import { Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import {HomeOutlined, SubnodeOutlined} from "@ant-design/icons";
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
  },
  {
    label: (
      <Link to="counter">
        Counter
      </Link>
    ),
    key: "counter"
  },
  {
    label: (
      <Link to="owner-cards">
        <FormattedMessage id="screen.OwnerCards" />
      </Link>
    ),
    key: "owner-cards"
  },
  {
    label: (
      <Link to="owner-list">
        <FormattedMessage id="screen.OwnerList" />
      </Link>
    ),
    key: "owner-list"
  },
  {
    label: (
      <Link to="owner-table">
        <FormattedMessage id="screen.OwnerTable" />
      </Link>
    ),
    key: "owner-table"
  },
  {
    label: (
      <Link to="owner-cards-with-filter">
        <FormattedMessage id="screen.OwnerCardsWithFilter" />
      </Link>
    ),
    key: "owner-cards-with-filter"
  },
  {
    label: (
      <Link to="owner-table-with-multiselect">
        <FormattedMessage id="screen.OwnerTableWithMultiselect" />
      </Link>
    ),
    key: "owner-table-with-multiselect"
  },
  {
    label: (
      <Link to="pet-cards">
        <FormattedMessage id="screen.PetCards" />
      </Link>
    ),
    key: "pet-cards"
  },
  {
    label: (
      <Link to="pet-list">
        <FormattedMessage id="screen.PetList" />
      </Link>
    ),
    key: "pet-list"
  },
  {
    label: (
      <Link to="pet-table">
        <FormattedMessage id="screen.PetTable" />
      </Link>
    ),
    key: "pet-table"
  },
  {
    label: (
      <Link to="scalars-list">
        <FormattedMessage id="screen.ScalarsList" />
      </Link>
    ),
    key: "scalars-list"
  },
  {
    label: (
      <Link to="scalars-table">
        <FormattedMessage id="screen.ScalarsTable" />
      </Link>
    ),
    key: "scalars-table"
  },
  {
    label: (
      <Link to="scalars-notnull-cards">
        <FormattedMessage id="screen.ScalarsNotNullCards" />
      </Link>
    ),
    key: "scalars-notnull-cards"
  },
  {
    label: (
      <Link to="pet-disease-list">
        <FormattedMessage id="screen.PetDiseaseList" />
      </Link>
    ),
    key: "pet-disease-list"
  },
  {
    label: (
      <Link to="pet-disease-cards">
        <FormattedMessage id="screen.PetDiseaseCards" />
      </Link>
    ),
    key: "pet-disease-cards"
  },
  {
    label: (
      <Link to="pet-disease-table">
        <FormattedMessage id="screen.PetDiseaseTable" />
      </Link>
    ),
    key: "pet-disease-table"
  },
  {
    label: (
      <Link to="read-only-owner-cards">
        <FormattedMessage id="screen.ReadOnlyOwnerCards" />
      </Link>
    ),
    key: "read-only-owner-cards"
  },
  {
    label: (
      <Link to="read-only-owner-table">
        <FormattedMessage id="screen.ReadOnlyOwnerTable" />
      </Link>
    ),
    key: "read-only-owner-table"
  },
  {
    label: (
      <Link to="read-only-owner-list">
        <FormattedMessage id="screen.ReadOnlyOwnerList" />
      </Link>
    ),
    key: "read-only-owner-list"
  },
  {
    label: (
      <Link to="read-only-pet-cards">
        <FormattedMessage id="screen.ReadOnlyPetCards" />
      </Link>
    ),
    key: "read-only-pet-cards"
  },
  {
    label: (
      <Link to="read-only-pet-table">
        <FormattedMessage id="screen.ReadOnlyPetTable" />
      </Link>
    ),
    key: "read-only-pet-table"
  },
  {
    label: (
      <Link to="read-only-pet-list">
        <FormattedMessage id="screen.ReadOnlyPetList" />
      </Link>
    ),
    key: "read-only-pet-list"
  },
  {
    label: (
      <Link to="read-only-scalars-list">
        <FormattedMessage id="screen.ReadOnlyScalarsList" />
      </Link>
    ),
    key: "read-only-scalars-list"
  },
  {
    label: (
      <Link to="read-only-pet-disease-list">
        <FormattedMessage id="screen.ReadOnlyPetDiseaseList" />
      </Link>
    ),
    key: "read-only-pet-disease-list"
  },
  {
    label: (
      <Link to="standalone-owner-cards">
        <FormattedMessage id="screen.StandaloneOwnerCards" />
      </Link>
    ),
    key: "standalone-owner-cards"
  },
  {
    label: (
      <Link to="standalone-owner-table">
        <FormattedMessage id="screen.StandaloneOwnerTable" />
      </Link>
    ),
    key: "standalone-owner-table"
  },
  {
    label: (
      <Link to="standalone-owner-list">
        <FormattedMessage id="screen.StandaloneOwnerList" />
      </Link>
    ),
    key: "standalone-owner-list"
  },
  {
    label: (
      <Link to="standalone-pet-disease-list">
        <FormattedMessage id="screen.StandalonePetDiseaseList" />
      </Link>
    ),
    key: "standalone-pet-disease-list"
  },
  {
    label: (
      <Link to="standalone-scalars-cards">
        <FormattedMessage id="screen.StandaloneScalarsCards" />
      </Link>
    ),
    key: "standalone-scalars-cards"
  },
  {
    label: (
      <Link to="standalone-owner-editor">
        <FormattedMessage id="screen.StandaloneOwnerEditor" />
      </Link>
    ),
    key: "standalone-owner-editor"
  },
  {
    label: (
      <Link to="standalone-pet-disease-editor">
        <FormattedMessage id="screen.StandalonePetDiseaseEditor" />
      </Link>
    ),
    key: "standalone-pet-disease-editor"
  },
  {
    label: (
      <Link to="standalone-scalars-editor">
        <FormattedMessage id="screen.StandaloneScalarsEditor" />
      </Link>
    ),
    key: "standalone-scalars-editor"
  },
  {
    label: (
      <Link to="standalone-owner-details">
        <FormattedMessage id="screen.StandaloneOwnerDetails" />
      </Link>
    ),
    key: "standalone-owner-details"
  },
  {
    label: (
      <Link to="standalone-pet-details">
        <FormattedMessage id="screen.StandalonePetDetails" />
      </Link>
    ),
    key: "standalone-pet-details"
  },
  {
    label: (
      <Link to="standalone-scalars-details">
        <FormattedMessage id="screen.StandaloneScalarsDetails" />
      </Link>
    ),
    key: "standalone-scalars-details"
  },
  {
    label: (
      <Link to="owner-lookup-cards">
        <FormattedMessage id="screen.OwnerLookupCards" />
      </Link>
    ),
    key: "owner-lookup-cards"
  },
  {
    label: (
      <Link to="pet-lookup-cards">
        <FormattedMessage id="screen.PetLookupCards" />
      </Link>
    ),
    key: "pet-lookup-cards"
  },
  {
    label: (
      <Link to="pet-type-lookup-cards">
        <FormattedMessage id="screen.PetTypeLookupCards" />
      </Link>
    ),
    key: "pet-type-lookup-cards"
  },
  {
    label: (
      <Link to="pet-disease-lookup-cards">
        <FormattedMessage id="screen.PetDiseaseLookupCards" />
      </Link>
    ),
    key: "pet-disease-lookup-cards"
  },
  {
    label: (
      <Link to="scalars-lookup-cards">
        <FormattedMessage id="screen.ScalarsLookupCards" />
      </Link>
    ),
    key: "scalars-lookup-cards"
  },
  {
    label: (
      <Link to="scalars-notnull-lookup-cards">
        <FormattedMessage id="screen.ScalarsNotNullLookupCards" />
      </Link>
    ),
    key: "scalars-notnull-lookup-cards"
  },
  {
    label: (
      <Link to="pet-description-lookup-cards">
        <FormattedMessage id="screen.PetDescriptionLookupCards" />
      </Link>
    ),
    key: "pet-description-lookup-cards"
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
