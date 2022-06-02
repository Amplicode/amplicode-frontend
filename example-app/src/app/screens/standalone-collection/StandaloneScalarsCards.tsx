import { ReactNode } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Modal, message, Card, Empty, Space, Spin } from "antd";
import {
  DeleteOutlined,
  LoadingOutlined,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "@amplicode/gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "@apollo/client/link/core";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getScalarsTestEntityDisplayName } from "../../../core/display-name/getScalarsTestEntityDisplayName";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const REFETCH_QUERIES = ["Get_Scalars_List"];

const SCALARS_TEST_ENTITY_LIST = gql(`
  query Get_Scalars_List {
    scalarsTestEntityList {
      id
      intTest
      intPrimitive
      byteTest
      bytePrimitive
      shortTest
      shortPrimitive
      doubleTest
      doublePrimitive
      floatTest
      floatPrimitive
      string
      bool
      boolPrimitive
      bigInt
      longTest
      longPrimitive
      bigDecimal
      localDate
      localDateTime
      localTime
      offsetDateTime
      offsetTime
      dateTest
      url
    }
  }
`);

const DELETE_SCALARS_TEST_ENTITY = gql(`
  mutation Delete_Scalars($id: ID!) {
    deleteScalarsTestEntity(id: $id)
  }
`);

export function StandaloneScalarsCards() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.StandaloneScalarsCards" })
  );

  // Load the items from server
  const { loading, error, data } = useQuery(SCALARS_TEST_ENTITY_LIST);
  const items = deserialize(data?.scalarsTestEntityList);

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
 * Button panel above the cards
 */
function ButtonPanel() {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        htmlType="button"
        key="create"
        title={intl.formatMessage({ id: "common.create" })}
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("new")}
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
        key="intPrimitive"
        label="Int Primitive"
        value={item.intPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="byteTest"
        label="Byte Test"
        value={item.byteTest ?? undefined}
      />
      <ValueWithLabel
        key="bytePrimitive"
        label="Byte Primitive"
        value={item.bytePrimitive ?? undefined}
      />
      <ValueWithLabel
        key="shortTest"
        label="Short Test"
        value={item.shortTest ?? undefined}
      />
      <ValueWithLabel
        key="shortPrimitive"
        label="Short Primitive"
        value={item.shortPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="doubleTest"
        label="Double Test"
        value={item.doubleTest ?? undefined}
      />
      <ValueWithLabel
        key="doublePrimitive"
        label="Double Primitive"
        value={item.doublePrimitive ?? undefined}
      />
      <ValueWithLabel
        key="floatTest"
        label="Float Test"
        value={item.floatTest ?? undefined}
      />
      <ValueWithLabel
        key="floatPrimitive"
        label="Float Primitive"
        value={item.floatPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="string"
        label="String"
        value={item.string ?? undefined}
      />
      <ValueWithLabel key="bool" label="Bool" value={item.bool ?? undefined} />
      <ValueWithLabel
        key="boolPrimitive"
        label="Bool Primitive"
        value={item.boolPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="bigInt"
        label="Big Int"
        value={item.bigInt ?? undefined}
      />
      <ValueWithLabel
        key="longTest"
        label="Long Test"
        value={item.longTest ?? undefined}
      />
      <ValueWithLabel
        key="longPrimitive"
        label="Long Primitive"
        value={item.longPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="bigDecimal"
        label="Big Decimal"
        value={item.bigDecimal ?? undefined}
      />
      <ValueWithLabel
        key="localDate"
        label="Local Date"
        value={item.localDate?.format("LL") ?? undefined}
      />
      <ValueWithLabel
        key="localDateTime"
        label="Local Date Time"
        value={item.localDateTime?.format("LLL") ?? undefined}
      />
      <ValueWithLabel
        key="localTime"
        label="Local Time"
        value={item.localTime?.format("LTS") ?? undefined}
      />
      <ValueWithLabel
        key="offsetDateTime"
        label="Offset Date Time"
        value={item.offsetDateTime?.format("LLL") ?? undefined}
      />
      <ValueWithLabel
        key="offsetTime"
        label="Offset Time"
        value={item.offsetTime?.format("LTS") ?? undefined}
      />
      <ValueWithLabel
        key="dateTest"
        label="Date Test"
        value={item.dateTest?.format("LLL") ?? undefined}
      />
      <ValueWithLabel
        key="url"
        label="Url"
        value={item.url ?? undefined}
        isUrl={true}
      />
    </Card>
  );
}

/**
 * Returns action buttons that will be displayed inside the card.
 */
function useCardActions(item: ItemType): ReactNode[] {
  const intl = useIntl();
  const { showDeleteConfirm, deleting } = useDeleteConfirm(item?.id);

  const navigate = useNavigate();

  return [
    <EditOutlined
      key="edit"
      title={intl.formatMessage({ id: "common.edit" })}
      onClick={() => {
        if (item?.id != null) {
          navigate(item.id);
        }
      }}
    />,
    deleting ? (
      <LoadingOutlined />
    ) : (
      <DeleteOutlined
        key="delete"
        title={intl.formatMessage({ id: "common.remove" })}
        onClick={showDeleteConfirm}
      />
    )
  ];
}

/**
 * Returns a confirmation dialog and invokes delete mutation upon confirmation
 * @param id id of the entity instance that should be deleted
 */
function useDeleteConfirm(id: string | null | undefined) {
  const intl = useIntl();

  const [runDeleteMutation, { loading }] = useMutation(
    DELETE_SCALARS_TEST_ENTITY
  );
  const deleteItem = useDeleteItem(id, runDeleteMutation, REFETCH_QUERIES);

  // Callback that deletes the item
  function handleDeleteItem() {
    deleteItem()
      .then(({ errors }: FetchResult) => {
        if (errors == null || errors.length === 0) {
          return handleDeleteSuccess();
        }
        return handleDeleteGraphQLError(errors);
      })
      .catch(handleDeleteNetworkError);
  }

  // Function that is executed when mutation is successful
  function handleDeleteSuccess() {
    return message.success(
      intl.formatMessage({ id: "EntityDetailsScreen.deletedSuccessfully" })
    );
  }

  // Function that is executed when mutation results in a GraphQL error
  function handleDeleteGraphQLError(
    errors: ReadonlyArray<GraphQLError> | undefined
  ) {
    console.error(errors);
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }

  // Function that is executed when mutation results in a network error (such as 4xx or 5xx)
  function handleDeleteNetworkError(error: Error | ApolloError) {
    console.error(error);
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }

  return {
    showDeleteConfirm: () =>
      Modal.confirm({
        content: intl.formatMessage({
          id: "EntityListScreen.deleteConfirmation"
        }),
        okText: intl.formatMessage({ id: "common.ok" }),
        cancelText: intl.formatMessage({ id: "common.cancel" }),
        onOk: handleDeleteItem
      }),
    deleting: loading
  };
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
