import { ReactNode, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Empty, List, Space, Spin } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
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

export function ReadOnlyPetList() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.ReadOnlyPetList" }));

  // Load the items from server
  const { loading, error, data } = useQuery(PET_LIST);

  const items = useMemo(() => deserialize(data?.petList), [data?.petList]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="list-space">
        <ListItems items={items} loading={loading} error={error} />
      </Space>
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
        renderItem={item => <ListItem item={item} key={item?.id} />}
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
          key="identificationNumber"
          label="Identification Number"
          value={item.identificationNumber ?? undefined}
        />
        <ValueWithLabel
          key="birthDate"
          label="Birth Date"
          value={item.birthDate?.format("LL") ?? undefined}
        />
        <ValueWithLabel
          key="type"
          label="Type"
          value={getPetTypeDTODisplayName(item.type ?? undefined)}
        />
        <ValueWithLabel
          key="owner"
          label="Owner"
          value={getOwnerDTODisplayName(item.owner ?? undefined)}
        />
        <ValueWithLabel
          key="description"
          label="Description"
          value={getPetDescriptionDTODisplayName(item.description ?? undefined)}
        />
        <ValueWithLabel
          key="tags"
          label="Tags"
          value={
            item.tags &&
            item.tags
              .map(entry => getTagDTODisplayName(entry))
              .filter(entry => entry !== "")
          }
        />
        <ValueWithLabel
          key="diseases"
          label="Diseases"
          value={
            item.diseases &&
            item.diseases
              .map(entry => getPetDiseaseDTODisplayName(entry))
              .filter(entry => entry !== "")
          }
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

  const navigate = useNavigate();

  return [
    <EnterOutlined
      key="open"
      title={intl.formatMessage({ id: "common.open" })}
      onClick={() => {
        if (item?.id != null) {
          navigate(item.id);
        }
      }}
    />
  ];
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["petList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
