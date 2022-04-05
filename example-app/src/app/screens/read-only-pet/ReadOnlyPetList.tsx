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
import { ReadOnlyPetListDetails } from "./ReadOnlyPetListDetails";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";

const ROUTE = "read-only-pet-list";

const PET_LIST = gql(`
  query Get_Pet_List {
    petList {
      id
      identificationNumber
      birthDate
      type {
        id
        name
      }
      owner {
        id
        firstName
        lastName
      }
    }
  }
`);

export function ReadOnlyPetList() {
  // Load the items from server
  const { loading, error, data } = useQuery(PET_LIST);
  const items = data?.petList;

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="list-space">
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
    screenComponent: ReadOnlyPetListDetails,
    screenCaptionKey: "screen.ReadOnlyPetListDetails",
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
          key="birthDate"
          label="Birth Date"
          value={item.birthDate ?? undefined}
        />
        <ValueWithLabel
          key="identificationNumber"
          label="Identification Number"
          value={item.identificationNumber ?? undefined}
        />
        <ValueWithLabel
          key="owner"
          label="Owner"
          value={getOwnerDTODisplayName(item.owner ?? undefined)}
        />
        <ValueWithLabel
          key="type"
          label="Type"
          value={getPetTypeDTODisplayName(item.type ?? undefined)}
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
    screenComponent: ReadOnlyPetListDetails,
    screenCaptionKey: "screen.ReadOnlyPetListDetails",
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
type QueryResultType = ResultOf<typeof PET_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["petList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
