import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Space, Table } from "antd";
import { useIntl } from "react-intl";
import { gql } from "../../../gql";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetDescriptionDTODisplayName } from "../../../core/display-name/getPetDescriptionDTODisplayName";
import { getTagDTODisplayName } from "../../../core/display-name/getTagDTODisplayName";
import { getPetDiseaseDTODisplayName } from "../../../core/display-name/getPetDiseaseDTODisplayName";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

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
      description {
        identifier
        description
      }
      tags {
        id
        name
      }
      diseases {
        petDiseaseIdentifier
        name
        description
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
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags"
  },
  {
    title: "Diseases",
    dataIndex: "diseases",
    key: "diseases"
  }
];

export function StandaloneReadOnlyPetTable() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.StandaloneReadOnlyPetTable" })
  );

  // Load the items from server
  const { loading, error, data } = useQuery(PET_LIST);

  const items = useMemo(() => deserialize(data?.petList), [data?.petList]);

  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

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
  if (error) {
    return <RequestFailedError />;
  }

  const dataSource = items
    ?.filter(item => item != null)
    .map(item => ({
      key: item?.id,
      ...item,
      ...{
        birthDate: item!.birthDate?.format("LL") ?? undefined,
        type: getPetTypeDTODisplayName(item!.type ?? undefined),
        owner: getOwnerDTODisplayName(item!.owner ?? undefined),
        description: getPetDescriptionDTODisplayName(
          item!.description ?? undefined
        ),
        tags:
          item &&
          item.tags &&
          item.tags
            .map(entry => getTagDTODisplayName(entry))
            .filter(entry => entry !== "")
            .join(", "),
        diseases:
          item &&
          item.diseases &&
          item.diseases
            .map(entry => getPetDiseaseDTODisplayName(entry))
            .filter(entry => entry !== "")
            .join(", ")
      }
    }));

  return (
    <Space direction="vertical" className="table-space entity-table-readonly">
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
type QueryResultType = ResultOf<typeof PET_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = QueryResultType["petList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
