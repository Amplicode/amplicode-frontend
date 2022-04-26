import { ReactNode, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Card, Empty, Space, Spin } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useScreens } from "@amplicode/react-core";
import { gql } from "@amplicode/gql";
import { TestScalarsCardsEditor } from "./TestScalarsCardsEditor";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getScalarsTestEntityDisplayName } from "../../../core/display-name/getScalarsTestEntityDisplayName";

const ROUTE = "scalars-cards";
const REFETCH_QUERIES = ["Get_Scalars_List"];

const SCALARS_TEST_ENTITY_LIST = gql(`
  query Get_Scalars_List {
    scalarsTestEntityList {
      id
      intTest
      floatTest
      string
      bool
    }
  }
`);

const DELETE_SCALARS_TEST_ENTITY = gql(`
  mutation Delete_Scalars($id: ID!) {
    deleteScalarsTestEntity(id: $id)
  }
`);

export function TestScalarsCards() {
  // Load the items from server
  const { loading, error, data } = useQuery(SCALARS_TEST_ENTITY_LIST);
  const items = deserialize(data?.scalarsTestEntityList);

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <ButtonPanel />
        <Cards items={items} loading={loading} error={error} />
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
    screenComponent: TestScalarsCardsEditor,
    screenCaptionKey: "screen.TestScalarsCardsEditor",
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
 * Button panel above the cards
 */
function ButtonPanel() {
  const intl = useIntl();

  // A callback that will open an empty editor form so that a new entity instance can be created
  const openEmptyEditor = useOpenItemScreen({
    route: ROUTE,
    screenComponent: TestScalarsCardsEditor,
    screenCaptionKey: "screen.TestScalarsCardsEditor",
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

interface ItemCardsListProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({ items, loading, error }: ItemCardsListProps) {
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
    <Space direction="vertical" className="card-space">
      {items.map(item => (
        <ItemCard item={item} key={item?.id} />
      ))}
    </Space>
  );
}

function ItemCard({ item }: { item: ItemType }) {
  // Get the action buttons that will be displayed in the card
  const cardActions: ReactNode[] = useCardActions(item);

  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={getScalarsTestEntityDisplayName(item)}
      actions={cardActions}
      className="narrow-layout"
    >
      <ValueWithLabel
        key="intTest"
        label="Int Test"
        value={item.intTest ?? undefined}
      />
      <ValueWithLabel
        key="floatTest"
        label="Float Test"
        value={item.floatTest ?? undefined}
      />
      <ValueWithLabel
        key="string"
        label="String"
        value={item.string ?? undefined}
      />
      <ValueWithLabel key="bool" label="Bool" value={item.bool ?? undefined} />
    </Card>
  );
}

/**
 * Returns action buttons that will be displayed inside the card.
 */
function useCardActions(item: ItemType): ReactNode[] {
  const intl = useIntl();

  // Callback that opens a details screen or an editor either for creating or for editing an item
  // depending on whether `item` is provided
  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: TestScalarsCardsEditor,
    screenCaptionKey: "screen.TestScalarsCardsEditor",
    refetchQueries: REFETCH_QUERIES,
    id: item?.id
  });

  const [runDeleteMutation] = useMutation(DELETE_SCALARS_TEST_ENTITY);
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
type QueryResultType = ResultOf<typeof SCALARS_TEST_ENTITY_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["scalarsTestEntityList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
