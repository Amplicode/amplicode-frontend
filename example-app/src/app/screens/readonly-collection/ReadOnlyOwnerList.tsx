import { ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Empty, List, Space, Spin } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

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

export function ReadOnlyOwnerList() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.ReadOnlyOwnerList" }));

  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);
  const items = deserialize(data?.ownerList);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="list-space">
        <ListItems items={items} loading={loading} error={error} />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

interface ListItemsProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
}

/**
 * Collection of items
 */
function ListItems({ items, loading, error }: ListItemsProps) {
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
    <Space direction="vertical" className="list-space">
      <List
        itemLayout="horizontal"
        bordered
        dataSource={items}
        renderItem={item => <ListItem item={item} key={item?.id} />}
      />
    </Space>
  );
}

function ListItem({ item }: { item: ItemType }) {
  // Get the action buttons that will be displayed in the row
  const rowActions: ReactNode[] = useRowActions(item);

  if (item == null) {
    return null;
  }

  return (
    <List.Item actions={rowActions}>
      <div className="list-wrapper">
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
        <ValueWithLabel
          key="city"
          label="City"
          value={item.city ?? undefined}
        />
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
      </div>
    </List.Item>
  );
}

/**
 * Returns action buttons that will be displayed inside the item row.
 */
function useRowActions(item: ItemType): ReactNode[] {
  const intl = useIntl();

  const navigate = useNavigate();

  return [
    <EnterOutlined
      key="open"
      title={intl.formatMessage({ id: "common.open" })}
      onClick={() => {
        if (item?.id != null) {
          navigate(item.id);
        }
      }}
    />
  ];
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
