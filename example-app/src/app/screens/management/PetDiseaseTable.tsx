import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Modal, message, Empty, Space, Spin, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "@amplicode/gql";
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
    deletePetDisease(id: $id)
  }
`);

const columns = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  }
];

export function PetDiseaseTable() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.PetDiseaseTable" }));

  // Load the items from server
  const { loading, error, data } = useQuery(PET_DISEASE_LIST);
  const items = deserialize(data?.petDiseaseList);
  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="table-space">
        <ButtonPanel selectedRowId={selectedRowId} />
        <TableSection
          items={items}
          loading={loading}
          error={error}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

/**
 * Button panel above
 */
function ButtonPanel({ selectedRowId }: { selectedRowId?: string }) {
  const intl = useIntl();
  const navigate = useNavigate();

  const { showDeleteConfirm, deleting } = useDeleteConfirm(selectedRowId!);

  return (
    <Space direction="horizontal">
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

      <Button
        htmlType="button"
        key="edit"
        title={intl.formatMessage({ id: "common.edit" })}
        disabled={selectedRowId == null}
        onClick={() => selectedRowId && navigate(selectedRowId)}
      >
        <span>
          <FormattedMessage id="common.edit" />
        </span>
      </Button>

      <Button
        htmlType="button"
        key="remove"
        title={intl.formatMessage({ id: "common.remove" })}
        disabled={selectedRowId == null}
        loading={deleting}
        onClick={showDeleteConfirm}
      >
        <span>
          <FormattedMessage id="common.remove" />
        </span>
      </Button>
    </Space>
  );
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
  const handleDeleteItem = () => {
    deleteItem()
      .then(({ errors }: FetchResult) => {
        if (errors == null || errors.length === 0) {
          return handleDeleteSuccess();
        }
        return handleDeleteGraphQLError(errors);
      })
      .catch(handleDeleteNetworkError);
  };

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

interface TableSectionProps {
  items?: ItemTableType;
  loading?: boolean;
  error?: ApolloError;
  selectedRowId?: string;
  setSelectedRowId: (id: any) => any;
}

/**
 * Collection of items
 */
function TableSection({
  items,
  loading,
  error,
  selectedRowId,
  setSelectedRowId
}: TableSectionProps) {
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <RequestFailedError />;
  }

  if (items == null || items.length === 0) {
    return <Empty />;
  }

  const dataSource = items
    .filter(item => item != null)
    .map(item => ({
      ...item
    }));

  return (
    <Space direction="vertical" className="table-space entity-table">
      <Table
        dataSource={dataSource as object[]}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.petDiseaseIdentifier === selectedRowId
            ? "table-row-selected"
            : ""
        }
        onRow={data => {
          return {
            onClick: () => {
              const id = (data as ItemType)?.petDiseaseIdentifier;
              setSelectedRowId(id === selectedRowId ? null : id);
            }
          };
        }}
        scroll={{ x: true }}
      />
    </Space>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_DISEASE_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = QueryResultType["petDiseaseList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
