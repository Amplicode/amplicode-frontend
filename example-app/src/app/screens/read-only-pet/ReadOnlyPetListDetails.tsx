import { useCallback } from "react";
import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useScreens } from "@amplicode/react-core";
import { getPetDTODisplayName } from "../../../core/display-name/getPetDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";

const PET = gql(`
  query Get_Pet($id: ID) {
    pet(id: $id) {
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
    }
  }
`);

export interface ReadOnlyPetListDetailsProps {
  /**
   * id of entity instance to be loaded when editing an instance.
   * Will be `undefined` when creating an instance.
   */
  id?: string;
}

export function ReadOnlyPetListDetails({ id }: ReadOnlyPetListDetailsProps) {
  const screens = useScreens();
  const history = useHistory();

  const { loading: queryLoading, error: queryError, data } = useQuery(PET, {
    variables: {
      id
    }
  });

  const goToParentScreen = useCallback(() => {
    history.push("."); // Remove entity id part from url
    screens.closeActiveBreadcrumb();
  }, [screens, history]);

  const item = data?.pet;

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
        title={getPetDTODisplayName(item)}
        column={1}
      >
        <Descriptions.Item label={<strong>Birth Date</strong>}>
          {item.birthDate ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Identification Number</strong>}>
          {item.identificationNumber ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Owner</strong>}>
          {getOwnerDTODisplayName(item.owner ?? undefined)}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Type</strong>}>
          {getPetTypeDTODisplayName(item.type ?? undefined)}
        </Descriptions.Item>
      </Descriptions>
      <Button htmlType="button" onClick={goToParentScreen}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
