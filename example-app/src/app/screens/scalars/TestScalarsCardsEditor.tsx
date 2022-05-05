import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Checkbox,
  DatePicker,
  message,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/es/form/Form";
import { gql } from "@amplicode/gql";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useSubmitEditor } from "../../../core/crud/useSubmitEditor";
import { ErrorMessage } from "../../../core/crud/ErrorMessage";
import { useCloseNestedScreen } from "../../../core/crud/useCloseNestedScreen";
import { FormattedMessage, useIntl } from "react-intl";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";
import { deserialize } from "../../../core/transform/model/deserialize";

const SCALARS_TEST_ENTITY = gql(`
  query Get_Scalars($id: ID) {
    scalarsTestEntity(id: $id) {
      id
      intTest
      floatTest
      string
      bool
      bigInt
      longTest
      bigDecimal
      localDate
      localDateTime
    }
  }
`);

const UPDATE_SCALARS_TEST_ENTITY = gql(`
  mutation Update_Scalars($input: ScalarsTestEntityInput) {
    updateScalarsTestEntity(input: $input) {
      id
    }
  }
`);

export interface TestScalarsCardsEditorProps<TData = any> {
  /**
   * id of entity instance to be loaded when editing an instance.
   * Will be `undefined` when creating an instance.
   */
  id?: string;
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function TestScalarsCardsEditor({
  id,
  refetchQueries
}: TestScalarsCardsEditorProps<QueryResultType>) {
  // Load the item if `id` is provided
  const { item, itemLoading, itemError } = useLoadItem(id);

  if (itemLoading) {
    return <Spin />;
  }

  if (itemError) {
    return <RequestFailedError />;
  }

  return <EditorForm item={item} id={id} refetchQueries={refetchQueries} />;
}

interface EditorFormProps<TData> {
  /**
   * Loaded entity instance (if editing).
   */
  item?: ItemType;
  /**
   *
   */
  id?: string;
  /**
   *
   */
  refetchQueries?: RefetchQueries<TData>;
}

function EditorForm<TData>({
  item,
  refetchQueries,
  id
}: EditorFormProps<TData>) {
  const [form] = useForm();

  // Global error message, i.e. error message not related to a particular form field.
  // Examples: cross-validation, network errors.
  const [formError, setFormError] = useState<string | undefined>();

  const { handleSubmit, submitting } = useSubmitEditor(
    UPDATE_SCALARS_TEST_ENTITY,
    setFormError,
    refetchQueries,
    "ScalarsTestEntityInput",
    id
  );
  const handleClientValidationFailed = useClientValidationFailed();

  // Put the item into the form.
  // Item becomes form field values, which will then be used inside `handleSubmit`.
  useFormData(form, item);

  return (
    <Card className="narrow-layout">
      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleClientValidationFailed}
        layout="vertical"
        form={form}
      >
        <FormFields />
        <ErrorMessage errorMessage={formError} />
        <FormButtons submitting={submitting} />
      </Form>
    </Card>
  );
}

function FormFields() {
  return (
    <>
      <Form.Item name="intTest" label="Int Test">
        <InputNumber
          type={"number"}
          precision={0}
          max={2147483647}
          min={-2147483648}
          autoFocus
        />
      </Form.Item>

      <Form.Item name="floatTest" label="Float Test">
        <InputNumber type={"number"} />
      </Form.Item>

      <Form.Item name="string" label="String">
        <Input />
      </Form.Item>

      <Form.Item
        name="bool"
        label="Bool"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox />
      </Form.Item>

      <Form.Item name="bigInt" label="Big Int">
        <InputNumber type={"number"} precision={0} stringMode={true} />
      </Form.Item>

      <Form.Item name="longTest" label="Long Test">
        <InputNumber type={"number"} precision={0} stringMode={true} />
      </Form.Item>

      <Form.Item name="bigDecimal" label="Big Decimal">
        <InputNumber type={"number"} stringMode={true} />
      </Form.Item>

      <Form.Item name="localDate" label="Local Date">
        <DatePicker />
      </Form.Item>

      <Form.Item name="localDateTime" label="Local Date Time">
        <DatePicker showTime={{ format: 'HH:mm:ss' }} />
      </Form.Item>
    </>
  );
}

/**
 * Buttons below the form.
 *
 * @param submitting flag indicating whether submit is in progress
 */
function FormButtons({ submitting }: { submitting?: boolean }) {
  const closeEditor = useCloseNestedScreen();

  return (
    <Form.Item className="form-buttons">
      <Space>
        <Button htmlType="button" onClick={closeEditor}>
          <FormattedMessage id="common.cancel" />
        </Button>
        <Button type="primary" htmlType="submit" loading={submitting}>
          <FormattedMessage id={"common.submit"} />
        </Button>
      </Space>
    </Form.Item>
  );
}

/**
 * Loads the item if `id` is provided
 *
 * @param id
 */
function useLoadItem(id?: string) {
  const [item, setItem] = useState<ItemType | null>();

  // Get the function that will load item from server,
  // also get variables that will contain loading/error state and response data
  // once the response is received
  const [loadItem, { loading, error, data }] = useLazyQuery(
    SCALARS_TEST_ENTITY,
    {
      variables: {
        id
      }
    }
  );

  // Load item if `id` has been provided in props
  useEffect(() => {
    if (id != null) {
      loadItem();
    }
  }, [loadItem, id]);

  // Get the received item, if any
  useEffect(() => {
    if (data?.scalarsTestEntity != null) {
      setItem(deserialize(data?.scalarsTestEntity));
    }
  }, [data, setItem]);

  return {
    item,
    itemLoading: loading,
    itemError: error
  };
}

/**
 * Puts the `item` inside the `form`
 *
 * @param form
 * @param item
 */
function useFormData(form: FormInstance, item?: ItemType) {
  useEffect(() => {
    if (item != null) {
      form.setFieldsValue(item);
    }
  }, [item, form]);
}

/**
 * Returns a callback that is executed when client-side validation of a form has failed
 */
function useClientValidationFailed() {
  const intl = useIntl();

  return useCallback(() => {
    return message.error(
      intl.formatMessage({ id: "EntityDetailsScreen.validationError" })
    );
  }, [intl]);
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof SCALARS_TEST_ENTITY>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["scalarsTestEntity"];
