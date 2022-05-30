import { ReactNode } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Modal, message, Empty, List, Space, Spin } from "antd";
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
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const REFETCH_QUERIES = ["Get_Pet_Disease_List"];

const PET_DISEASE_LIST = gql(`
  query Get_Pet_Disease_List {
    petDiseaseList {
      description
      name
      petDiseaseIdentifier
    }
  }
`);

const DELETE_PET_DISEASE = gql(`
  mutation Delete_Pet_Disease($id: ID!) {
    deletePetDisease(petDiseaseIdentifier: $id)
  }
`);

export function StandalonePetDiseaseList() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.StandalonePetDiseaseList" })
  );

  // Load the items from server
  const { loading, error, data } = useQuery(PET_DISEASE_LIST);
  const items = deserialize(data?.petDiseaseList);

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
 * Button panel above
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
        renderItem={item => (
          <ListItem item={item} key={item?.petDiseaseIdentifier} />
        )}
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
          key="description"
          label="Description"
          value={item.description ?? undefined}
        />
        <ValueWithLabel
          key="name"
          label="Name"
          value={item.name ?? undefined}
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
  const { showDeleteConfirm, deleting } = useDeleteConfirm(
    item?.petDiseaseIdentifier
  );

  const navigate = useNavigate();

  return [
    <EditOutlined
      key="edit"
      title={intl.formatMessage({ id: "common.edit" })}
      onClick={() => {
        if (item?.petDiseaseIdentifier != null) {
          navigate(item.petDiseaseIdentifier);
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

  const [runDeleteMutation, { loading }] = useMutation(DELETE_PET_DISEASE);
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
type QueryResultType = ResultOf<typeof PET_DISEASE_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["petDiseaseList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
