import { useCallback } from "react";
import { Card, Spin, Result, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import {
  useScreens,
  guessDisplayName,
  guessLabel
} from "@amplicode/react-core";

const OWNER = gql(/* GraphQL */ `
  query Owner_ReadOnlyOwnerDetails($id: BigInteger) {
    owner(id: $id) {
      id
      firstName
      lastName
      city
      address
      email
      telephone
    }
  }
`);

export interface ReadOnlyOwnerDetailsProps {
  /**
   * id of entity instance to be loaded when editing an instance.
   * Will be `undefined` when creating an instance.
   */
  id?: string;
}

export function ReadOnlyOwnerDetails({ id }: ReadOnlyOwnerDetailsProps) {
  const screens = useScreens();
  const history = useHistory();

  const { loading: queryLoading, error: queryError, data } = useQuery(OWNER, {
    variables: {
      id
    }
  });

  const goToParentScreen = useCallback(() => {
    history.push("."); // Remove entity id part from url
    screens.closeActiveBreadcrumb();
  }, [screens, history]);

  const item = data?.owner;

  if (queryLoading) {
    return <Spin />;
  }

  if (queryError) {
    return (
      <Result
        status="error"
        title={<FormattedMessage id="common.requestFailed" />}
      />
    );
  }

  if (item == null) {
    return <Empty />;
  }

  return (
    <Card className="narrow-layout">
      <Descriptions
        layout="horizontal"
        title={guessDisplayName(item)}
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
        <Descriptions.Item label={<strong>Email</strong>}>
          {item.email ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Telephone</strong>}>
          {item.telephone ?? undefined}
        </Descriptions.Item>
      </Descriptions>
      <Button htmlType="button" onClick={goToParentScreen}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
