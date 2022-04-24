import { useCallback } from "react";
import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useScreens } from "@amplicode/react-core";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";

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

export interface ReadOnlyOwnerCardsDetailsProps {
  /**
   * id of entity instance to be loaded when editing an instance.
   * Will be `undefined` when creating an instance.
   */
  id?: string;
}

export function ReadOnlyOwnerCardsDetails({
  id
}: ReadOnlyOwnerCardsDetailsProps) {
  const screens = useScreens();
  const history = useHistory();

  const { loading: queryLoading, error: queryError, data } = useQuery(OWNER, {
    variables: {
      id
    }
  });

  const item = deserialize(data?.owner);

  const goToParentScreen = useCallback(() => {
    history.push("."); // Remove entity id part from url
    screens.closeActiveBreadcrumb();
  }, [screens, history]);

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
      <Button htmlType="button" onClick={goToParentScreen}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
