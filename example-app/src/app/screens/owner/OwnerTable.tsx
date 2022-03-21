import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Empty, Space, Spin, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useScreens } from "@amplicode/react-core";
import { gql } from "@amplicode/gql";
import { OwnerTableEditor } from "./OwnerTableEditor";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";

const ROUTE = "owner-table";
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

const DELETE__OWNER = gql(`
  mutation Delete_Owner($id: BigInteger!) {
    delete_Owner(id: $id)
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

export function OwnerTable() {
  // Load the items from server
  const { loading, error, data } = useQuery(OWNER_LIST);
  const items = data?.ownerList;
  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" style={{ width: "100%" }}>
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
 * Checks whether the url contains the item id, and if yes - open item editor/details screen.
 */
function useItemUrl() {
  const screens = useScreens();
  const match = useRouteMatch<{ id: string }>(`/${ROUTE}/:id`);

  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: OwnerTableEditor,
    screenCaptionKey: "screen.OwnerTableEditor",
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
 * Button panel above
 */
function ButtonPanel(props: { selectedRowId?: string }) {
  const intl = useIntl();

  const openEditorProps = {
    route: ROUTE,
    screenComponent: OwnerTableEditor,
    screenCaptionKey: "screen.OwnerTableEditor",
    refetchQueries: REFETCH_QUERIES
  };

  // A callback that will open an empty editor
  const openEmptyEditor = useOpenItemScreen(openEditorProps);
  // A callback that will open an editor with item
  const openEditorWithItem = useOpenItemScreen({
    ...openEditorProps,
    id: props.selectedRowId!
  });

  const [runDeleteMutation] = useMutation(DELETE__OWNER);
  // Callback that deletes the item
  const deleteItem = useDeleteItem(
    props.selectedRowId!,
    runDeleteMutation,
    REFETCH_QUERIES
  );

  return (
    <Space direction="horizontal">
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

      <Button
        htmlType="button"
        key="edit"
        title={intl.formatMessage({ id: "common.edit" })}
        disabled={props.selectedRowId == null}
        onClick={openEditorWithItem}
      >
        <span>
          <FormattedMessage id="common.edit" />
        </span>
      </Button>

      <Button
        htmlType="button"
        key="remove"
        title={intl.formatMessage({ id: "common.remove" })}
        disabled={props.selectedRowId == null}
        onClick={deleteItem}
      >
        <span>
          <FormattedMessage id="common.remove" />
        </span>
      </Button>
    </Space>
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

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Table
        dataSource={items.filter(item => item != null) as object[]}
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
