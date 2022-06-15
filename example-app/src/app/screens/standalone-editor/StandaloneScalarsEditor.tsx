import { useCallback, useEffect, useState } from "react";
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
  message,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/es/form/Form";
import { DatePicker, TimePicker } from "@amplicode/react";
import { gql } from "../../../gql";
import { useNavigate, useParams } from "react-router-dom";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useSubmitEditor } from "../../../core/crud/useSubmitEditor";
import { ErrorMessage } from "../../../core/crud/ErrorMessage";
import { FormattedMessage, useIntl } from "react-intl";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const SCALARS_TEST_ENTITY = gql(`
  query Get_Scalars($id: ID) {
    scalarsTestEntity(id: $id) {
      id
      intTest
      intPrimitive
      byteTest
      bytePrimitive
      shortTest
      shortPrimitive
      doubleTest
      doublePrimitive
      floatTest
      floatPrimitive
      string
      bool
      boolPrimitive
      bigInt
      longTest
      longPrimitive
      bigDecimal
      localDate
      localDateTime
      localTime
      offsetDateTime
      offsetTime
      dateTest
      url
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

export interface StandaloneScalarsEditorProps<TData = any> {
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function StandaloneScalarsEditor({
  refetchQueries
}: StandaloneScalarsEditorProps<QueryResultType>) {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.StandaloneScalarsEditor" })
  );

  const { recordId } = useParams();

  // Load the item if `id` is provided
  const { item, itemLoading, itemError } = useLoadItem(recordId);

  if (itemLoading) {
    return <Spin />;
  }

  if (itemError) {
    return <RequestFailedError />;
  }

  return (
    <EditorForm item={item} id={recordId} refetchQueries={refetchQueries} />
  );
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
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
          autoFocus
        />
      </Form.Item>

      <Form.Item name="intPrimitive" label="Int Primitive">
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item name="byteTest" label="Byte Test">
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item name="bytePrimitive" label="Byte Primitive">
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item name="shortTest" label="Short Test">
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item name="shortPrimitive" label="Short Primitive">
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item name="doubleTest" label="Double Test">
        <InputNumber type="number" />
      </Form.Item>

      <Form.Item name="doublePrimitive" label="Double Primitive">
        <InputNumber type="number" />
      </Form.Item>

      <Form.Item name="floatTest" label="Float Test">
        <InputNumber type="number" />
      </Form.Item>

      <Form.Item name="floatPrimitive" label="Float Primitive">
        <InputNumber type="number" />
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

      <Form.Item
        name="boolPrimitive"
        label="Bool Primitive"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox />
      </Form.Item>

      <Form.Item name="bigInt" label="Big Int">
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>

      <Form.Item name="longTest" label="Long Test">
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>

      <Form.Item name="longPrimitive" label="Long Primitive">
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>

      <Form.Item name="bigDecimal" label="Big Decimal">
        <InputNumber type="number" stringMode />
      </Form.Item>

      <Form.Item name="localDate" label="Local Date">
        <DatePicker />
      </Form.Item>

      <Form.Item name="localDateTime" label="Local Date Time">
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item name="localTime" label="Local Time">
        <TimePicker />
      </Form.Item>

      <Form.Item name="offsetDateTime" label="Offset Date Time">
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item name="offsetTime" label="Offset Time">
        <TimePicker />
      </Form.Item>

      <Form.Item name="dateTest" label="Date Test">
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item name="url" label="Url">
        <Input type="url" />
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
  const navigate = useNavigate();

  return (
    <Form.Item className="form-buttons">
      <Space>
        <Button htmlType="button" onClick={() => navigate("..")}>
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
    if (id != null && id !== "new") {
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
