import { ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Empty, List, Space, Spin } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { gql } from "@amplicode/gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";

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

export function ReadOnlyScalarsList() {
  // Load the items from server
  const { loading, error, data } = useQuery(SCALARS_TEST_ENTITY_LIST);
  const items = deserialize(data?.scalarsTestEntityList);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="list-space">
        <ListItems items={items} loading={loading} error={error} />
        {/* <Pagination /> - in future */}
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
        <ValueWithLabel
          key="bool"
          label="Bool"
          value={item.bool ?? undefined}
        />
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
          value={item.localDate?.format("LL") ?? undefined}
        />
        <ValueWithLabel
          key="localDateTime"
          label="Local Date Time"
          value={item.localDateTime?.format("LLL") ?? undefined}
        />
        <ValueWithLabel
          key="localTime"
          label="Local Time"
          value={item.localTime?.format("LTS") ?? undefined}
        />
        <ValueWithLabel
          key="offsetDateTime"
          label="Offset Date Time"
          value={item.offsetDateTime?.format("LLL") ?? undefined}
        />
        <ValueWithLabel
          key="offsetTime"
          label="Offset Time"
          value={item.offsetTime?.format("LTS") ?? undefined}
        />
        <ValueWithLabel
          key="dateTest"
          label="Date Test"
          value={item.dateTest?.format("LLL") ?? undefined}
        />
        <ValueWithLabel
          key="url"
          label="Url"
          value={item.url ?? undefined}
          isUrl={true}
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
type QueryResultType = ResultOf<typeof SCALARS_TEST_ENTITY_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["scalarsTestEntityList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
