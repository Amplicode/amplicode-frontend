import { ReactNode, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Empty, List, Space, Spin } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import { useIntl } from "react-intl";
import { useScreens } from "@amplicode/react-core";
import { gql } from "@amplicode/gql";
import { ReadOnlyOwnerListDetails } from "./ReadOnlyOwnerListDetails";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";

const ROUTE = "read-only-owner-list";

const OWNER_LIST = gql(/* GraphQL */ `
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
  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);
  const items = data?.ownerList;

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" style={{ width: "100%" }}>
        <ListItems items={items} loading={loading} error={error} />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

/**
 * Checks whether the url contains the item id, and if yes - open item editor/details screen.
 */
function useItemUrl() {
  const screens = useScreens();
  const match = useRouteMatch<{ id: string }>(`/${ROUTE}/:id`);

  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: ReadOnlyOwnerListDetails,
    screenCaptionKey: "screen.ReadOnlyOwnerListDetails",
    id: match?.params.id
  });

  useEffect(() => {
    if (
      screens.activeTab?.breadcrumbs.length === 1 &&
      match?.params.id != null
    ) {
      openItem();
    }
  });
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
    <Space direction="vertical" style={{ width: "100%" }}>
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
      <div style={{ flexGrow: 1 }}>
        <ValueWithLabel
          key="address"
          label="Address"
          value={item.address ?? undefined}
        />
        <ValueWithLabel
          key="city"
          label="City"
          value={item.city ?? undefined}
        />
        <ValueWithLabel
          key="email"
          label="Email"
          value={item.email ?? undefined}
        />
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
          key="telephone"
          label="Telephone"
          value={item.telephone ?? undefined}
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

  // Callback that opens an editor either for creating or for editing an item
  // depending on whether `item` is provided
  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: ReadOnlyOwnerListDetails,
    screenCaptionKey: "screen.ReadOnlyOwnerListDetails",
    id: item?.id
  });

  return [
    <EnterOutlined
      key="open"
      title={intl.formatMessage({ id: "common.open" })}
      onClick={openItem}
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
