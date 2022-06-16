import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Card, Empty, Space, Spin } from "antd";
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useIntl } from "react-intl";
import { getNotNullScalarsTestEntityDisplayName } from "../../../core/display-name/getNotNullScalarsTestEntityDisplayName";

const NOT_NULL_SCALARS_TEST_ENTITY_LIST = gql(`
  query Get_NN_Scalars_List {
    notNullScalarsTestEntityList {
      id
      bigDecimalNotNull
      bigIntNotNull
      dateTestNotNull
      localDateNotNull
      localDateTimeNotNull
      localTimeNotNull
      offsetDateTimeNotNull
      offsetTimeNotNull
      stringNotNull
      urlNotNull
    }
  }
`);

interface ScalarsNotNullLookupCardsProps {
  onSelect?: (entityInstance: Record<string, unknown>) => {};
}

export function ScalarsNotNullLookupCards(
  props: ScalarsNotNullLookupCardsProps
) {
  // Load the items from server
  const { loading, error, data } = useQuery(NOT_NULL_SCALARS_TEST_ENTITY_LIST);
  const items = data?.notNullScalarsTestEntityList;

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
        { label: getNotNullScalarsTestEntityDisplayName(item) }
      )}
      className="narrow-layout"
      onClick={() => onSelect(item)}
    >
      <ValueWithLabel
        key="bigDecimalNotNull"
        label="Big Decimal Not Null"
        value={item.bigDecimalNotNull ?? undefined}
      />
      <ValueWithLabel
        key="bigIntNotNull"
        label="Big Int Not Null"
        value={item.bigIntNotNull ?? undefined}
      />
      <ValueWithLabel
        key="dateTestNotNull"
        label="Date Test Not Null"
        value={item.dateTestNotNull ?? undefined}
      />
      <ValueWithLabel
        key="localDateNotNull"
        label="Local Date Not Null"
        value={item.localDateNotNull ?? undefined}
      />
      <ValueWithLabel
        key="localDateTimeNotNull"
        label="Local Date Time Not Null"
        value={item.localDateTimeNotNull ?? undefined}
      />
      <ValueWithLabel
        key="localTimeNotNull"
        label="Local Time Not Null"
        value={item.localTimeNotNull ?? undefined}
      />
      <ValueWithLabel
        key="offsetDateTimeNotNull"
        label="Offset Date Time Not Null"
        value={item.offsetDateTimeNotNull ?? undefined}
      />
      <ValueWithLabel
        key="offsetTimeNotNull"
        label="Offset Time Not Null"
        value={item.offsetTimeNotNull ?? undefined}
      />
      <ValueWithLabel
        key="stringNotNull"
        label="String Not Null"
        value={item.stringNotNull ?? undefined}
      />
      <ValueWithLabel
        key="urlNotNull"
        label="Url Not Null"
        value={item.urlNotNull ?? undefined}
      />
    </Card>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof NOT_NULL_SCALARS_TEST_ENTITY_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["notNullScalarsTestEntityList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
