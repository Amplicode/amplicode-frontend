import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Card, Empty, Space, Spin } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "@amplicode/gql";
import { CloseOutlined } from "@ant-design/icons";
import { useScreens } from "@amplicode/react-core";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";

const OWNER_LIST = gql(`
  query Get_Owner_List {
    ownerList {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }
`);

interface OwnerLookupProps {
  onSelect?: (entityInstance: Record<string, unknown>) => {};
}

export function OwnerLookup(props: OwnerLookupProps) {
  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);
  const items = data?.ownerList;

  const screens = useScreens();
  const goToParentScreen = useCallback(() => {
    screens.closeActiveBreadcrumb();
  }, [screens]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <ButtonPanel goToParentScreen={goToParentScreen} />
        <Cards
          items={items}
          loading={loading}
          error={error}
          onSelect={item => {
            props.onSelect != null && props.onSelect(item);
            goToParentScreen();
          }}
        />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

interface ButtonPanelProps {
  goToParentScreen: () => void;
}

/**
 * Button panel above
 */
function ButtonPanel(props: ButtonPanelProps) {
  const intl = useIntl();

  return (
    <div>
      <Button
        htmlType="button"
        key="close"
        title={intl.formatMessage({ id: "common.close" })}
        icon={<CloseOutlined />}
        onClick={props.goToParentScreen}
      >
        <span>
          <FormattedMessage id="common.close" />
        </span>
      </Button>
    </div>
  );
}

interface ItemCardsProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({ items, loading, error, onSelect }: ItemCardsProps) {
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <RequestFailedError />;
  }

  if (items == null || items.length === 0) {
    return <Empty />;
  }

  return (
    <Space direction="vertical" className="lookup-cards card-space">
      {items.map(item => (
        <ItemCard item={item} key={item?.id} onSelect={onSelect} />
      ))}
    </Space>
  );
}

interface ItemCardProps {
  item: ItemType;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

function ItemCard({ item, onSelect }: ItemCardProps) {
  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={getOwnerDTODisplayName(item)}
      className="narrow-layout"
      onClick={() => onSelect(item)}
    >
      <ValueWithLabel
        key="firstName"
        label="First Name"
        value={item.firstName ?? undefined}
      />
      <ValueWithLabel
        key="lastName"
        label="Last Name"
        value={item.lastName ?? undefined}
      />
      <ValueWithLabel key="city" label="City" value={item.city ?? undefined} />
      <ValueWithLabel
        key="address"
        label="Address"
        value={item.address ?? undefined}
      />
      <ValueWithLabel
        key="telephone"
        label="Telephone"
        value={item.telephone ?? undefined}
      />
      <ValueWithLabel
        key="email"
        label="Email"
        value={item.email ?? undefined}
      />
    </Card>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof OWNER_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["ownerList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
