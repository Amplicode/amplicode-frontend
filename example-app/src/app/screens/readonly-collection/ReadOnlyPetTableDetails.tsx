import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "../../../gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { getPetDTODisplayName } from "../../../core/display-name/getPetDTODisplayName";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetDescriptionDTODisplayName } from "../../../core/display-name/getPetDescriptionDTODisplayName";
import { getTagDTODisplayName } from "../../../core/display-name/getTagDTODisplayName";
import { getPetDiseaseDTODisplayName } from "../../../core/display-name/getPetDiseaseDTODisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const PET = gql(`
  query Get_Pet($id: ID!) {
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
      description {
        identifier
        description
      }
      tags {
        id
        name
      }
      diseases {
        petDiseaseIdentifier
        name
        description
      }      
    }
  }
`);

export function ReadOnlyPetTableDetails() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.ReadOnlyPetTableDetails" })
  );

  const { recordId } = useParams();
  const navigate = useNavigate();

  if (recordId == null) throw new Error("recordId must be defined");
  const { loading: queryLoading, error: queryError, data } = useQuery(PET, {
    variables: {
      id: recordId
    }
  });

  const item = deserialize(data?.pet);

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
        <Descriptions.Item label={<strong>Identification Number</strong>}>
          {item.identificationNumber ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Birth Date</strong>}>
          {item.birthDate?.format("LL") ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Type</strong>}>
          {getPetTypeDTODisplayName(item.type ?? undefined)}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Owner</strong>}>
          {getOwnerDTODisplayName(item.owner ?? undefined)}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Description</strong>}>
          {getPetDescriptionDTODisplayName(item.description ?? undefined)}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Tags</strong>}>
          {item.tags &&
            item.tags
              .map(entry => getTagDTODisplayName(entry))
              .filter(entry => entry !== "")
              .join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Diseases</strong>}>
          {item.diseases &&
            item.diseases
              .map(entry => getPetDiseaseDTODisplayName(entry))
              .filter(entry => entry !== "")
              .join(", ")}
        </Descriptions.Item>
      </Descriptions>
      <Button htmlType="button" onClick={() => navigate("..")}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
