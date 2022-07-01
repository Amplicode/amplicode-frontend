import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Empty, Space, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { gql } from "../../../gql";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

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

export function ReadOnlyOwnerTable() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.ReadOnlyOwnerTable" }));

  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);
  const items = deserialize(data?.ownerList);

  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  const navigate = useNavigate();

  // Open details if row selected
  useEffect(() => {
    if (selectedRowId != null) {
      navigate(selectedRowId);
    }
  }, [navigate, selectedRowId]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="table-space">
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
      key: item?.id,
      ...item
    }));

  return (
    <Space direction="vertical" className="table-space entity-table-readonly">
      <Table
        dataSource={dataSource as object[]}
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
type QueryResultType = ResultOf<typeof OWNER_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = QueryResultType["ownerList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
