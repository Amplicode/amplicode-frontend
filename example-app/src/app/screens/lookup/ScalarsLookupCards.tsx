import React from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Card, Empty, Space, Spin } from "antd";
import { gql } from "@amplicode/gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useIntl } from "react-intl";
import { getScalarsTestEntityDisplayName } from "../../../core/display-name/getScalarsTestEntityDisplayName";

const SCALARS_TEST_ENTITY_LIST = gql(`
  query Get_Scalars_List {
    scalarsTestEntityList {
      id
      intTest
      intPrimitive
      byteTest
      bytePrimitive
      shortTest
      shortPrimitive
      doubleTest
      doublePrimitive
      floatTest
      floatPrimitive
      string
      bool
      boolPrimitive
      bigInt
      longTest
      longPrimitive
      bigDecimal
      localDate
      localDateTime
      localTime
      offsetDateTime
      offsetTime
      dateTest
      url
    }
  }
`);

interface ScalarsLookupCardsProps {
  onSelect?: (entityInstance: Record<string, unknown>) => {};
}

export function ScalarsLookupCards(props: ScalarsLookupCardsProps) {
  // Load the items from server
  const { loading, error, data } = useQuery(SCALARS_TEST_ENTITY_LIST);
  const items = data?.scalarsTestEntityList;

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
        { label: getScalarsTestEntityDisplayName(item) }
      )}
      className="narrow-layout"
      onClick={() => onSelect(item)}
    >
      <ValueWithLabel
        key="intTest"
        label="Int Test"
        value={item.intTest ?? undefined}
      />
      <ValueWithLabel
        key="intPrimitive"
        label="Int Primitive"
        value={item.intPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="byteTest"
        label="Byte Test"
        value={item.byteTest ?? undefined}
      />
      <ValueWithLabel
        key="bytePrimitive"
        label="Byte Primitive"
        value={item.bytePrimitive ?? undefined}
      />
      <ValueWithLabel
        key="shortTest"
        label="Short Test"
        value={item.shortTest ?? undefined}
      />
      <ValueWithLabel
        key="shortPrimitive"
        label="Short Primitive"
        value={item.shortPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="doubleTest"
        label="Double Test"
        value={item.doubleTest ?? undefined}
      />
      <ValueWithLabel
        key="doublePrimitive"
        label="Double Primitive"
        value={item.doublePrimitive ?? undefined}
      />
      <ValueWithLabel
        key="floatTest"
        label="Float Test"
        value={item.floatTest ?? undefined}
      />
      <ValueWithLabel
        key="floatPrimitive"
        label="Float Primitive"
        value={item.floatPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="string"
        label="String"
        value={item.string ?? undefined}
      />
      <ValueWithLabel key="bool" label="Bool" value={item.bool ?? undefined} />
      <ValueWithLabel
        key="boolPrimitive"
        label="Bool Primitive"
        value={item.boolPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="bigInt"
        label="Big Int"
        value={item.bigInt ?? undefined}
      />
      <ValueWithLabel
        key="longTest"
        label="Long Test"
        value={item.longTest ?? undefined}
      />
      <ValueWithLabel
        key="longPrimitive"
        label="Long Primitive"
        value={item.longPrimitive ?? undefined}
      />
      <ValueWithLabel
        key="bigDecimal"
        label="Big Decimal"
        value={item.bigDecimal ?? undefined}
      />
      <ValueWithLabel
        key="localDate"
        label="Local Date"
        value={item.localDate ?? undefined}
      />
      <ValueWithLabel
        key="localDateTime"
        label="Local Date Time"
        value={item.localDateTime ?? undefined}
      />
      <ValueWithLabel
        key="localTime"
        label="Local Time"
        value={item.localTime ?? undefined}
      />
      <ValueWithLabel
        key="offsetDateTime"
        label="Offset Date Time"
        value={item.offsetDateTime ?? undefined}
      />
      <ValueWithLabel
        key="offsetTime"
        label="Offset Time"
        value={item.offsetTime ?? undefined}
      />
      <ValueWithLabel
        key="dateTest"
        label="Date Test"
        value={item.dateTest ?? undefined}
      />
      <ValueWithLabel key="url" label="Url" value={item.url ?? undefined} />
    </Card>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof SCALARS_TEST_ENTITY_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["scalarsTestEntityList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
