import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { getScalarsTestEntityDisplayName } from "../../../core/display-name/getScalarsTestEntityDisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";

const SCALARS_TEST_ENTITY = gql(`
  query Get_Scalars($id: ID) {
    scalarsTestEntity(id: $id) {
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

export function ReadOnlyScalarsListDetails() {
  const { recordId } = useParams();
  const navigate = useNavigate();

  const { loading: queryLoading, error: queryError, data } = useQuery(
    SCALARS_TEST_ENTITY,
    {
      variables: {
        id: recordId
      }
    }
  );

  const item = deserialize(data?.scalarsTestEntity);

  if (queryLoading) {
    return <Spin />;
  }

  if (queryError) {
    return <RequestFailedError />;
  }

  if (item == null) {
    return <Empty />;
  }

  return (
    <Card className="narrow-layout">
      <Descriptions
        layout="horizontal"
        title={getScalarsTestEntityDisplayName(item)}
        column={1}
      >
        <Descriptions.Item label={<strong>Int Test</strong>}>
          {item.intTest ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Int Primitive</strong>}>
          {item.intPrimitive ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Byte Test</strong>}>
          {item.byteTest ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Byte Primitive</strong>}>
          {item.bytePrimitive ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Short Test</strong>}>
          {item.shortTest ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Short Primitive</strong>}>
          {item.shortPrimitive ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Double Test</strong>}>
          {item.doubleTest ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Double Primitive</strong>}>
          {item.doublePrimitive ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Float Test</strong>}>
          {item.floatTest ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Float Primitive</strong>}>
          {item.floatPrimitive ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>String</strong>}>
          {item.string ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Bool</strong>}>
          {item.bool ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Bool Primitive</strong>}>
          {item.boolPrimitive ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Big Int</strong>}>
          {item.bigInt ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Long Test</strong>}>
          {item.longTest ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Long Primitive</strong>}>
          {item.longPrimitive ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Big Decimal</strong>}>
          {item.bigDecimal ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Local Date</strong>}>
          {item.localDate?.format("LL") ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Local Date Time</strong>}>
          {item.localDateTime?.format("LLL") ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Local Time</strong>}>
          {item.localTime?.format("LTS") ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Offset Date Time</strong>}>
          {item.offsetDateTime?.format("LLL") ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Offset Time</strong>}>
          {item.offsetTime?.format("LTS") ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Date Test</strong>}>
          {item.dateTest?.format("LLL") ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Url</strong>}>
          {item.url && (
            <a target="_blank" rel="noreferrer" href={item.url}>
              {item.url}
            </a>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Button htmlType="button" onClick={() => navigate("..")}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
