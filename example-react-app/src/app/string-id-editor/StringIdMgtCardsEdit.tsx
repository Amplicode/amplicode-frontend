import React, { useContext } from "react";
import { Form, Alert, Button, Card } from "antd";
import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { FormattedMessage } from "react-intl";
import {
  createAntdFormValidationMessages,
  createUseAntdForm,
  RetryDialog,
  Field,
  MultilineText,
  Spinner,
  useEntityEditor,
  EntityEditorProps,
  registerEntityEditorScreen
} from "@haulmont/jmix-react-ui";
import { gql } from "@apollo/client";
import "../../app/App.css";
import { StringIdTestEntity } from "../../jmix/entities/scr_StringIdTestEntity";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdMgtCardsEdit";

const LOAD_SCR_STRINGIDTESTENTITY = gql`
  query scr_StringIdTestEntityById($id: String = "", $loadItem: Boolean!) {
    scr_StringIdTestEntityById(id: $id) @include(if: $loadItem) {
      identifier
      _instanceName
      description
      productCode

      createTs
      createdBy
      updateTs
      updatedBy
      deleteTs
      deletedBy
      version

      datatypesTestEntity {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
    }

    scr_DatatypesTestEntityList {
      id
      _instanceName
    }

    scr_DatatypesTestEntity3List {
      id
      _instanceName
    }
  }
`;

const UPSERT_SCR_STRINGIDTESTENTITY = gql`
  mutation Upsert_scr_StringIdTestEntity(
    $stringIdTestEntity: inp_scr_StringIdTestEntity!
  ) {
    upsert_scr_StringIdTestEntity(stringIdTestEntity: $stringIdTestEntity) {
      id
    }
  }
`;

const StringIdMgtCardsEdit = observer(
  (props: EntityEditorProps<StringIdTestEntity>) => {
    const {
      onCommit,
      entityInstance,
      submitBtnCaption = "common.submit"
    } = props;

    const [form] = useForm();

    const {
      relationOptions,
      executeLoadQuery,
      loadQueryResult: { loading: queryLoading, error: queryError },
      upsertMutationResult: { loading: upsertLoading },
      entityEditorState,
      intl,
      handleSubmit,
      handleSubmitFailed,
      handleCancelBtnClick
    } = useEntityEditor<StringIdTestEntity>({
      loadQuery: LOAD_SCR_STRINGIDTESTENTITY,
      upsertMutation: UPSERT_SCR_STRINGIDTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      onCommit,
      entityInstance,
      useEntityEditorForm: createUseAntdForm(form)
    });

    if (queryLoading) {
      return <Spinner />;
    }

    if (queryError != null) {
      console.error(queryError);
      return <RetryDialog onRetry={executeLoadQuery} />;
    }

    return (
      <Card className="narrow-layout">
        <Form
          onFinish={handleSubmit}
          onFinishFailed={handleSubmitFailed}
          layout="vertical"
          form={form}
          validateMessages={createAntdFormValidationMessages(intl)}
        >
          <Field
            entityName={ENTITY_NAME}
            propertyName="description"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="productCode"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="createTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="createdBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="updateTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="updatedBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="deleteTs"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="deletedBy"
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="datatypesTestEntity"
            associationOptions={relationOptions?.get("scr_DatatypesTestEntity")}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          <Field
            entityName={ENTITY_NAME}
            propertyName="datatypesTestEntity3"
            associationOptions={relationOptions?.get(
              "scr_DatatypesTestEntity3"
            )}
            formItemProps={{
              style: { marginBottom: "12px" }
            }}
          />

          {entityEditorState.globalErrors.length > 0 && (
            <Alert
              message={
                <MultilineText lines={toJS(entityEditorState.globalErrors)} />
              }
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

registerEntityEditorScreen(
  ENTITY_NAME,
  "stringIdMgtCardsEdit",
  <StringIdMgtCardsEdit />
);

export default StringIdMgtCardsEdit;
