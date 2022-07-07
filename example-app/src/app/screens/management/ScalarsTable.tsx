import { useState } from "react";
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

const columns = [
  {
    title: "Int Test",
    dataIndex: "intTest",
    key: "intTest"
  },
  {
    title: "Int Primitive",
    dataIndex: "intPrimitive",
    key: "intPrimitive"
  },
  {
    title: "Byte Test",
    dataIndex: "byteTest",
    key: "byteTest"
  },
  {
    title: "Byte Primitive",
    dataIndex: "bytePrimitive",
    key: "bytePrimitive"
  },
  {
    title: "Short Test",
    dataIndex: "shortTest",
    key: "shortTest"
  },
  {
    title: "Short Primitive",
    dataIndex: "shortPrimitive",
    key: "shortPrimitive"
  },
  {
    title: "Double Test",
    dataIndex: "doubleTest",
    key: "doubleTest"
  },
  {
    title: "Double Primitive",
    dataIndex: "doublePrimitive",
    key: "doublePrimitive"
  },
  {
    title: "Float Test",
    dataIndex: "floatTest",
    key: "floatTest"
  },
  {
    title: "Float Primitive",
    dataIndex: "floatPrimitive",
    key: "floatPrimitive"
  },
  {
    title: "String",
    dataIndex: "string",
    key: "string"
  },
  {
    title: "Bool",
    dataIndex: "bool",
    key: "bool"
  },
  {
    title: "Bool Primitive",
    dataIndex: "boolPrimitive",
    key: "boolPrimitive"
  },
  {
    title: "Big Int",
    dataIndex: "bigInt",
    key: "bigInt"
  },
  {
    title: "Long Test",
    dataIndex: "longTest",
    key: "longTest"
  },
  {
    title: "Long Primitive",
    dataIndex: "longPrimitive",
    key: "longPrimitive"
  },
  {
    title: "Big Decimal",
    dataIndex: "bigDecimal",
    key: "bigDecimal"
  },
  {
    title: "Local Date",
    dataIndex: "localDate",
    key: "localDate"
  },
  {
    title: "Local Date Time",
    dataIndex: "localDateTime",
    key: "localDateTime"
  },
  {
    title: "Local Time",
    dataIndex: "localTime",
    key: "localTime"
  },
  {
    title: "Offset Date Time",
    dataIndex: "offsetDateTime",
    key: "offsetDateTime"
  },
  {
    title: "Offset Time",
    dataIndex: "offsetTime",
    key: "offsetTime"
  },
  {
    title: "Date Test",
    dataIndex: "dateTest",
    key: "dateTest"
  },
  {
    title: "Url",
    dataIndex: "url",
    render: (url: string) => (
      <a target="_blank" rel="noreferrer" href={url}>
        {url}
      </a>
    ),
    key: "url"
  }
];

export function ScalarsTable() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.ScalarsTable" }));

  // Load the items from server
  const { loading, error, data } = useQuery(SCALARS_TEST_ENTITY_LIST);
  const items = deserialize(data?.scalarsTestEntityList);

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
      </Space>
    </div>
  );
}

interface ButtonPanelProps {
  selectedRowId?: string;
}
/**
 * Button panel above
 */
function ButtonPanel({ selectedRowId }: ButtonPanelProps) {
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

  const [runDeleteMutation, { loading }] = useMutation(
    DELETE_SCALARS_TEST_ENTITY
  );
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
  if (error) {
    return <RequestFailedError />;
  }

  const dataSource = items
    ?.filter(item => item != null)
    .map(item => ({
      key: item?.id,
      ...item,
      ...{
        localDate: item!.localDate?.format("LL") ?? undefined,
        localDateTime: item!.localDateTime?.format("LLL") ?? undefined,
        localTime: item!.localTime?.format("LTS") ?? undefined,
        offsetDateTime: item!.offsetDateTime?.format("LLL") ?? undefined,
        offsetTime: item!.offsetTime?.format("LTS") ?? undefined,
        dateTest: item!.dateTest?.format("LLL") ?? undefined
      }
    }));

  return (
    <Space direction="vertical" className="table-space entity-table">
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return {
            onClick: () => {
              const id = (data as ItemType)?.id;
              setSelectedRowId(id === selectedRowId ? null : id);
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
type QueryResultType = ResultOf<typeof SCALARS_TEST_ENTITY_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = QueryResultType["scalarsTestEntityList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
