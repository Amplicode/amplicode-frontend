import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Empty, Space, Spin, Table } from "antd";
import { useRouteMatch } from "react-router-dom";
import { useScreens } from "@amplicode/react-core";
import { gql } from "@amplicode/gql";
import { ReadOnlyPetTableDetails } from "./ReadOnlyPetTableDetails";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserializeCustomScalars } from "../../../core/transform/model/deserializeCustomScalars";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";

const ROUTE = "read-only-pet-table";

const PET_LIST = gql(`
  query Get_Pet_List {
    petList {
      id
      identificationNumber
      birthDate
      type {
        id
        name
      }
      owner {
        id
        firstName
        lastName
      }
    }
  }
`);

const columns = [
  {
    title: "Identification Number",
    dataIndex: "identificationNumber",
    key: "identificationNumber"
  },
  {
    title: "Birth Date",
    dataIndex: "birthDate",
    key: "birthDate"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner"
  }
];

export function ReadOnlyPetTable() {
  // Load the items from server
  const { loading, error, data } = useQuery(PET_LIST);
  const items = deserializeCustomScalars(data?.petList);
  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  const openEditorWithItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: ReadOnlyPetTableDetails,
    screenCaptionKey: "screen.ReadOnlyPetTableDetails",
    id: selectedRowId
  });

  // Open details if row selected
  useEffect(() => {
    if (selectedRowId != null) {
      openEditorWithItem();
    }
  }, [openEditorWithItem, selectedRowId]);

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
    screenComponent: ReadOnlyPetTableDetails,
    screenCaptionKey: "screen.ReadOnlyPetTableDetails",
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

  const dataSource = items
    .filter(item => item != null)
    .map(item => ({
      ...item,
      ...{
        birthDate: item!.birthDate?.format("LL") ?? undefined,
        type: getPetTypeDTODisplayName(item!.type ?? undefined),
        owner: getOwnerDTODisplayName(item!.owner ?? undefined)
      }
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
      />
    </Space>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = QueryResultType["petList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
