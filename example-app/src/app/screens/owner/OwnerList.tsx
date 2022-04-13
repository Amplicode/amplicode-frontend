import { ReactNode, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Empty, List, Space, Spin } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useScreens } from "@amplicode/react-core";
import { gql } from "@amplicode/gql";
import { OwnerListEditor } from "./OwnerListEditor";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserializeCustomScalars } from "../../../core/transform/model/deserializeCustomScalars";

const ROUTE = "owner-list";
const REFETCH_QUERIES = ["Get_Owner_List"];

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

const DELETE_OWNER = gql(`
  mutation Delete_Owner($id: ID!) {
    deleteOwner(id: $id)
  }
`);

export function OwnerList() {
  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);
  const items = deserializeCustomScalars(data?.ownerList);

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="list-space">
        <ButtonPanel />
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
    screenComponent: OwnerListEditor,
    screenCaptionKey: "screen.OwnerListEditor",
    refetchQueries: REFETCH_QUERIES,
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

/**
 * Button panel above
 */
function ButtonPanel() {
  const intl = useIntl();

  // A callback that will open an empty editor form so that a new entity instance can be created
  const openEmptyEditor = useOpenItemScreen({
    route: ROUTE,
    screenComponent: OwnerListEditor,
    screenCaptionKey: "screen.OwnerListEditor",
    refetchQueries: REFETCH_QUERIES
  });

  return (
    <div>
      <Button
        htmlType="button"
        key="create"
        title={intl.formatMessage({ id: "common.create" })}
        type="primary"
        icon={<PlusOutlined />}
        onClick={openEmptyEditor}
      >
        <span>
          <FormattedMessage id="common.create" />
        </span>
      </Button>
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
    screenComponent: OwnerListEditor,
    screenCaptionKey: "screen.OwnerListEditor",
    refetchQueries: REFETCH_QUERIES,
    id: item?.id
  });

  const [runDeleteMutation] = useMutation(DELETE_OWNER);
  // Callback that deletes the item
  const deleteItem = useDeleteItem(
    item?.id,
    runDeleteMutation,
    REFETCH_QUERIES
  );

  return [
    <EditOutlined
      key="edit"
      title={intl.formatMessage({ id: "common.edit" })}
      onClick={openItem}
    />,
    <DeleteOutlined
      key="delete"
      title={intl.formatMessage({ id: "common.remove" })}
      onClick={deleteItem}
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
