import { useMemo, ReactNode } from "react";
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
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "@apollo/client/link/core";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getNotNullScalarsTestEntityDisplayName } from "../../../core/display-name/getNotNullScalarsTestEntityDisplayName";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const REFETCH_QUERIES = ["Get_NN_Scalars_List"];

const NOT_NULL_SCALARS_TEST_ENTITY_LIST = gql(`
  query Get_NN_Scalars_List {
    notNullScalarsTestEntityList {
      id
      bigDecimalNotNull
      bigIntNotNull
      dateTestNotNull
      localDateNotNull
      localDateTimeNotNull
      localTimeNotNull
      offsetDateTimeNotNull
      offsetTimeNotNull
      stringNotNull
      urlNotNull
    }
  }
`);

const DELETE_NOT_NULL_SCALARS_TEST_ENTITY = gql(`
  mutation Delete_NN_Scalars($id: ID!) {
    deleteNotNullScalarsTestEntity(id: $id)
  }
`);

export function ScalarsNotNullCards() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.ScalarsNotNullCards" }));

  // Load the items from server
  const { loading, error, data } = useQuery(NOT_NULL_SCALARS_TEST_ENTITY_LIST);

  const items = useMemo(() => deserialize(data?.notNullScalarsTestEntityList), [
    data?.notNullScalarsTestEntityList
  ]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <ButtonPanel />
        <Cards items={items} loading={loading} error={error} />
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
    <Space>
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
    </Space>
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
      title={getNotNullScalarsTestEntityDisplayName(item)}
      actions={cardActions}
      className="narrow-layout"
    >
      <ValueWithLabel
        key="bigDecimalNotNull"
        label="Big Decimal Not Null"
        value={item.bigDecimalNotNull ?? undefined}
      />
      <ValueWithLabel
        key="bigIntNotNull"
        label="Big Int Not Null"
        value={item.bigIntNotNull ?? undefined}
      />
      <ValueWithLabel
        key="dateTestNotNull"
        label="Date Test Not Null"
        value={item.dateTestNotNull?.format("LLL") ?? undefined}
      />
      <ValueWithLabel
        key="localDateNotNull"
        label="Local Date Not Null"
        value={item.localDateNotNull?.format("LL") ?? undefined}
      />
      <ValueWithLabel
        key="localDateTimeNotNull"
        label="Local Date Time Not Null"
        value={item.localDateTimeNotNull?.format("LLL") ?? undefined}
      />
      <ValueWithLabel
        key="localTimeNotNull"
        label="Local Time Not Null"
        value={item.localTimeNotNull?.format("LTS") ?? undefined}
      />
      <ValueWithLabel
        key="offsetDateTimeNotNull"
        label="Offset Date Time Not Null"
        value={item.offsetDateTimeNotNull?.format("LLL") ?? undefined}
      />
      <ValueWithLabel
        key="offsetTimeNotNull"
        label="Offset Time Not Null"
        value={item.offsetTimeNotNull?.format("LTS") ?? undefined}
      />
      <ValueWithLabel
        key="stringNotNull"
        label="String Not Null"
        value={item.stringNotNull ?? undefined}
      />
      <ValueWithLabel
        key="urlNotNull"
        label="Url Not Null"
        value={item.urlNotNull ?? undefined}
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
  const navigate = useNavigate();
  const { showDeleteConfirm, deleting } = useDeleteConfirm(item?.id);

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
    DELETE_NOT_NULL_SCALARS_TEST_ENTITY
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
type QueryResultType = ResultOf<typeof NOT_NULL_SCALARS_TEST_ENTITY_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["notNullScalarsTestEntityList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
