import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Modal, message, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "../../../gql";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "@apollo/client/link/core";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

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

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName"
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName"
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Telephone",
    dataIndex: "telephone",
    key: "telephone"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  }
];

export function OwnerTableWithMultiselect() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.OwnerTableWithMultiselect" })
  );

  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);

  const items = useMemo(() => deserialize(data?.ownerList), [data?.ownerList]);

  // selected row id
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="table-space">
        <ButtonPanel
          selectedRowIds={selectedRowIds}
          setSelectedRowIds={setSelectedRowIds}
        />
        <TableSection
          items={items}
          loading={loading}
          error={error}
          selectedRowIds={selectedRowIds}
          setSelectedRowIds={setSelectedRowIds}
        />
      </Space>
    </div>
  );
}

interface ButtonPanelProps {
  selectedRowIds: string[];
  setSelectedRowIds: (id: any) => any;
}
/**
 * Button panel above
 */
function ButtonPanel({ selectedRowIds, setSelectedRowIds }: ButtonPanelProps) {
  const intl = useIntl();
  const navigate = useNavigate();

  const { showDeleteConfirm, deleting } = useDeleteConfirm(
    selectedRowIds[0],
    setSelectedRowIds
  );

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
        disabled={selectedRowIds.length !== 1}
        onClick={() => selectedRowIds.length > 0 && navigate(selectedRowIds[0])}
      >
        <span>
          <FormattedMessage id="common.edit" />
        </span>
      </Button>
      <Button
        htmlType="button"
        key="remove"
        title={intl.formatMessage({ id: "common.remove" })}
        disabled={selectedRowIds.length !== 1}
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
function useDeleteConfirm(
  id: string | null | undefined,
  setSelectedRowIds: (id: any) => any
) {
  const intl = useIntl();

  const [runDeleteMutation, { loading }] = useMutation(DELETE_OWNER);
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
    setSelectedRowIds([]);

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
  selectedRowIds: string[];
  setSelectedRowIds: (id: any) => any;
}

/**
 * Collection of items
 */
function TableSection({
  items,
  loading,
  error,
  selectedRowIds,
  setSelectedRowIds
}: TableSectionProps) {
  if (error) {
    return <RequestFailedError />;
  }

  const dataSource = items
    ?.filter(item => item != null)
    .map(item => ({
      key: item?.id,
      ...item
    }));

  return (
    <Space direction="vertical" className="table-space entity-table">
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedRowIds,
          onChange: (keys: React.Key[]) => setSelectedRowIds(keys)
        }}
        onRow={data => {
          return {
            onClick: () => {
              const id = (data as ItemType)?.id;
              if (selectedRowIds.includes(id!)) {
                setSelectedRowIds(
                  selectedRowIds.filter((item: string) => item !== id)
                );
              } else {
                setSelectedRowIds([...selectedRowIds, id]);
              }
            }
          };
        }}
        scroll={{ x: true }}
        pagination={false}
      />
    </Space>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof OWNER_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = QueryResultType["ownerList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
