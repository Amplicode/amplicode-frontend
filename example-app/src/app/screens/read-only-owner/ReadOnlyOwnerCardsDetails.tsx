import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const OWNER = gql(`
  query Get_Owner($id: ID) {
    owner(id: $id) {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }
`);

export function ReadOnlyOwnerCardsDetails() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.ReadOnlyOwnerCardsDetails" })
  );

  const { recordId } = useParams();
  const navigate = useNavigate();

  const { loading: queryLoading, error: queryError, data } = useQuery(OWNER, {
    variables: {
      id: recordId
    }
  });

  const item = deserialize(data?.owner);

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
        title={getOwnerDTODisplayName(item)}
        column={1}
      >
        <Descriptions.Item label={<strong>First Name</strong>}>
          {item.firstName ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Last Name</strong>}>
          {item.lastName ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>City</strong>}>
          {item.city ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Address</strong>}>
          {item.address ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Telephone</strong>}>
          {item.telephone ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Email</strong>}>
          {item.email ?? undefined}
        </Descriptions.Item>
      </Descriptions>
      <Button htmlType="button" onClick={() => navigate("..")}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
