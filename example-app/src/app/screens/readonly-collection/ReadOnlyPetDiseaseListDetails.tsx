import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { getPetDiseaseDTODisplayName } from "../../../core/display-name/getPetDiseaseDTODisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const PET_DISEASE = gql(`
  query Get_Pet_Disease($id: ID) {
    petDisease(petDiseaseIdentifier: $id) {
      description
      name
      petDiseaseIdentifier
    }
  }
`);

export function ReadOnlyPetDiseaseListDetails() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.ReadOnlyPetDiseaseListDetails" })
  );

  const { recordId } = useParams();
  const navigate = useNavigate();

  const { loading: queryLoading, error: queryError, data } = useQuery(
    PET_DISEASE,
    {
      variables: {
        id: recordId
      }
    }
  );

  const item = deserialize(data?.petDisease);

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
        title={getPetDiseaseDTODisplayName(item)}
        column={1}
      >
        <Descriptions.Item label={<strong>Description</strong>}>
          {item.description ?? undefined}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Name</strong>}>
          {item.name ?? undefined}
        </Descriptions.Item>
      </Descriptions>
      <Button htmlType="button" onClick={() => navigate("..")}>
        <FormattedMessage id="common.close" />
      </Button>
    </Card>
  );
}
