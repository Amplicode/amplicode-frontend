import { Card, Spin, Empty, Descriptions, Button } from "antd";
import { gql } from "@amplicode/gql";
import { useQuery } from "@apollo/client";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { getPetDiseaseDisplayName } from "../../../core/display-name/getPetDiseaseDisplayName";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";

const PET_DISEASE = gql(`
  query Get_Pet_Disease($id: ID) {
    petDisease(id: $id) {
      description
      name
      petDiseaseIdentifier
    }
  }
`);

export function ReadOnlyPetDiseaseListDetails() {
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
        title={getPetDiseaseDisplayName(item)}
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
