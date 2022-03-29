import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Empty, Space, Spin, Table } from "antd";
import { useRouteMatch } from "react-router-dom";
import { useScreens } from "@amplicode/react-core";
import { gql } from "@amplicode/gql";
import { ReadOnlyOwnerTableDetails } from "./ReadOnlyOwnerTableDetails";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";

const ROUTE = "read-only-owner-table";

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
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
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
    title: "Telephone",
    dataIndex: "telephone",
    key: "telephone"
  }
];

export function ReadOnlyOwnerTable() {
  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);
  const items = data?.ownerList;
  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  const openEditorWithItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: ReadOnlyOwnerTableDetails,
    screenCaptionKey: "screen.ReadOnlyOwnerTableDetails",
    id: selectedRowId
  });

  // Open details if row selected
  useEffect(() => {
    if (selectedRowId != null) {
      openEditorWithItem();
    }
  }, [selectedRowId]);

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
    screenComponent: ReadOnlyOwnerTableDetails,
    screenCaptionKey: "screen.ReadOnlyOwnerTableDetails",
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

  const dataSource = items.filter(item => item != null);

  return (
    <Space direction="vertical" className="table-space">
      <Table
        dataSource={dataSource as object[]}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return { onClick: () => setSelectedRowId((data as ItemType)?.id) };
        }}
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
