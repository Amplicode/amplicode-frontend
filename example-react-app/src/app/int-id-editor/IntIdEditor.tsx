import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import { useMetadata, ScreensContext } from "@haulmont/jmix-react-core";
import {
  createAntdFormValidationMessages,
  RetryDialog,
  Field,
  MultilineText,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  MultiScreenContext,
  registerEntityEditorScreen
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { IntegerIdTestEntity } from "../../jmix/entities/scr_IntegerIdTestEntity";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const UPSERT_INPUT_NAME = "integerIdTestEntity";
const ROUTING_PATH = "/intIdEditor";

const LOAD_SCR_INTEGERIDTESTENTITY = gql`
  query scr_IntegerIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_IntegerIdTestEntityById(id: $id) @include(if: $loadItem) {
      id
      _instanceName
      description
    }
  }
`;

const UPSERT_SCR_INTEGERIDTESTENTITY = gql`
  mutation Upsert_scr_IntegerIdTestEntity(
    $integerIdTestEntity: inp_scr_IntegerIdTestEntity!
  ) {
    upsert_scr_IntegerIdTestEntity(integerIdTestEntity: $integerIdTestEntity) {
      id
    }
  }
`;

const IntIdEditor = observer(
  (props: EntityEditorProps<IntegerIdTestEntity>) => {
    const {
      onCommit,
      entityInstance,
      submitBtnCaption = "common.submit",
      hiddenAttributes
    } = props;
    const multiScreen = useContext(MultiScreenContext);
    const screens = useContext(ScreensContext);
    const metadata = useMetadata();

    const {
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      store,
      form,
      intl,
      handleFinish,
      handleFinishFailed,
      handleCancelBtnClick
    } = useEntityEditor<IntegerIdTestEntity>({
      loadQuery: LOAD_SCR_INTEGERIDTESTENTITY,
      upsertMutation: UPSERT_SCR_INTEGERIDTESTENTITY,
      entityId: multiScreen?.params?.entityId,
      entityName: ENTITY_NAME,
      upsertInputName: UPSERT_INPUT_NAME,
      routingPath: ROUTING_PATH,
      screens,
      multiScreen,
      onCommit,
      entityInstance
    });

    if (queryLoading || metadata == null) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
      <Card className="narrow-layout">
        <Form
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          layout="vertical"
          form={form}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={ENTITY_NAME}
            propertyName="description"
            hide={hiddenAttributes?.includes("description")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          {store.globalErrors.length > 0 && (
            <Alert
              message={<MultilineText lines={toJS(store.globalErrors)} />}
              type="error"
              style={{ marginBottom: "24px" }}
            />
          )}

          <Form.Item style={{ textAlign: "center" }}>
            <Button htmlType="button" onClick={handleCancelBtnClick}>
              <FormattedMessage id="common.cancel" />
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={upsertLoading}
              style={{ marginLeft: "8px" }}
            >
              <FormattedMessage id={submitBtnCaption} />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
);

registerEntityEditorScreen(ENTITY_NAME, "intIdEditor", <IntIdEditor />);

export default IntIdEditor;