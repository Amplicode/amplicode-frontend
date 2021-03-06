import { useMemo, ReactNode } from "react";
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
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const PET_DISEASE_LIST = gql(`
  query Get_Pet_Disease_List {
    petDiseaseList {
      description
      name
      petDiseaseIdentifier
    }
  }
`);

export function ReadOnlyPetDiseaseList() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.ReadOnlyPetDiseaseList" })
  );

  // Load the items from server
  const { loading, error, data } = useQuery(PET_DISEASE_LIST);

  const items = useMemo(() => deserialize(data?.petDiseaseList), [
    data?.petDiseaseList
  ]);

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
  const navigate = useNavigate();

  return [
    <EnterOutlined
      key="open"
      title={intl.formatMessage({ id: "common.open" })}
      onClick={() => {
        if (item?.petDiseaseIdentifier != null) {
          navigate(item.petDiseaseIdentifier);
        }
      }}
    />
  ];
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
