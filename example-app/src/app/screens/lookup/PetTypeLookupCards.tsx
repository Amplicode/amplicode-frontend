import React from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Card, Empty, Space, Spin } from "antd";
import { gql } from "@amplicode/gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useIntl } from "react-intl";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";

const PET_TYPE_LIST = gql(`
  query Get_Pet_Type_List {
    petTypeList {
      id, 
      name
    }
  }
`);

interface PetTypeLookupCardsProps {
  onSelect?: (entityInstance: Record<string, unknown>) => {};
}

export function PetTypeLookupCards(props: PetTypeLookupCardsProps) {
  // Load the items from server
  const { loading, error, data } = useQuery(PET_TYPE_LIST);
  const items = data?.petTypeList;

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <Cards
          items={items}
          loading={loading}
          error={error}
          onSelect={item => {
            props.onSelect != null && props.onSelect(item);
          }}
        />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

interface ItemCardsProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({ items, loading, error, onSelect }: ItemCardsProps) {
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
    <Space direction="vertical" className="lookup-cards card-space">
      {items.map(item => (
        <ItemCard item={item} key={item?.id} onSelect={onSelect} />
      ))}
    </Space>
  );
}

interface ItemCardProps {
  item: ItemType;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

function ItemCard({ item, onSelect }: ItemCardProps) {
  const intl = useIntl();

  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={intl.formatMessage(
        { id: "EntityLookupField.selectEntityInstance" },
        { label: getPetTypeDTODisplayName(item) }
      )}
      className="narrow-layout"
      onClick={() => onSelect(item)}
    >
      <ValueWithLabel key="name" label="Name" value={item.name ?? undefined} />
    </Card>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_TYPE_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["petTypeList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
