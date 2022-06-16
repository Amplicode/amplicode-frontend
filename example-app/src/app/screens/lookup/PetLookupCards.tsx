import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Card, Empty, Space, Spin } from "antd";
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useIntl } from "react-intl";
import { getPetDTODisplayName } from "../../../core/display-name/getPetDTODisplayName";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetDescriptionDTODisplayName } from "../../../core/display-name/getPetDescriptionDTODisplayName";

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
    }
  }
`);

interface PetLookupCardsProps {
  onSelect?: (entityInstance: Record<string, unknown>) => {};
}

export function PetLookupCards(props: PetLookupCardsProps) {
  // Load the items from server
  const { loading, error, data } = useQuery(PET_LIST);
  const items = data?.petList;

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
        { label: getPetDTODisplayName(item) }
      )}
      className="narrow-layout"
      onClick={() => onSelect(item)}
    >
      <ValueWithLabel
        key="identificationNumber"
        label="Identification Number"
        value={item.identificationNumber ?? undefined}
      />
      <ValueWithLabel
        key="birthDate"
        label="Birth Date"
        value={item.birthDate ?? undefined}
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
    </Card>
  );
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
