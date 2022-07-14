import { useMemo, useCallback, useEffect, useState } from "react";
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
import {
  FieldError,
  useSubmitEditor
} from "../../../core/crud/useSubmitEditor";
import { ErrorMessages } from "../../../core/crud/ErrorMessages";
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
  const [formErrors, setFormErrors] = useState<string[]>([]);
  // Errors related to fields
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  const { handleSubmit, submitting } = useSubmitEditor(
    UPDATE_SCALARS_TEST_ENTITY,
    setFormErrors,
    setFieldErrors,
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
        <FormFields item={item} fieldErrors={fieldErrors} />
        <ErrorMessages errorMessages={formErrors} />
        <FormButtons submitting={submitting} />
      </Form>
    </Card>
  );
}

function FormFields({
  item,
  fieldErrors
}: {
  item?: ItemType;
  fieldErrors: FieldError[];
}) {
  return (
    <>
      <Form.Item
        name="intTest"
        label="Int Test"
        help={<FieldErrorMessages path="intTest" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "intTest") ? "error" : "success"}
      >
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
          autoFocus
        />
      </Form.Item>

      <Form.Item
        name="intPrimitive"
        label="Int Primitive"
        help={
          <FieldErrorMessages path="intPrimitive" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "intPrimitive") ? "error" : "success"
        }
      >
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item
        name="byteTest"
        label="Byte Test"
        help={<FieldErrorMessages path="byteTest" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "byteTest") ? "error" : "success"}
      >
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item
        name="bytePrimitive"
        label="Byte Primitive"
        help={
          <FieldErrorMessages path="bytePrimitive" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "bytePrimitive") ? "error" : "success"
        }
      >
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item
        name="shortTest"
        label="Short Test"
        help={<FieldErrorMessages path="shortTest" fieldErrors={fieldErrors} />}
        validateStatus={
          hasError(fieldErrors, "shortTest") ? "error" : "success"
        }
      >
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item
        name="shortPrimitive"
        label="Short Primitive"
        help={
          <FieldErrorMessages path="shortPrimitive" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "shortPrimitive") ? "error" : "success"
        }
      >
        <InputNumber
          type="number"
          precision={0}
          max={2147483647}
          min={-2147483648}
        />
      </Form.Item>

      <Form.Item
        name="doubleTest"
        label="Double Test"
        help={
          <FieldErrorMessages path="doubleTest" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "doubleTest") ? "error" : "success"
        }
      >
        <InputNumber type="number" />
      </Form.Item>

      <Form.Item
        name="doublePrimitive"
        label="Double Primitive"
        help={
          <FieldErrorMessages
            path="doublePrimitive"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "doublePrimitive") ? "error" : "success"
        }
      >
        <InputNumber type="number" />
      </Form.Item>

      <Form.Item
        name="floatTest"
        label="Float Test"
        help={<FieldErrorMessages path="floatTest" fieldErrors={fieldErrors} />}
        validateStatus={
          hasError(fieldErrors, "floatTest") ? "error" : "success"
        }
      >
        <InputNumber type="number" />
      </Form.Item>

      <Form.Item
        name="floatPrimitive"
        label="Float Primitive"
        help={
          <FieldErrorMessages path="floatPrimitive" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "floatPrimitive") ? "error" : "success"
        }
      >
        <InputNumber type="number" />
      </Form.Item>

      <Form.Item
        name="string"
        label="String"
        help={<FieldErrorMessages path="string" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "string") ? "error" : "success"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="bool"
        label="Bool"
        help={<FieldErrorMessages path="bool" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "bool") ? "error" : "success"}
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        name="boolPrimitive"
        label="Bool Primitive"
        help={
          <FieldErrorMessages path="boolPrimitive" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "boolPrimitive") ? "error" : "success"
        }
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        name="bigInt"
        label="Big Int"
        help={<FieldErrorMessages path="bigInt" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "bigInt") ? "error" : "success"}
      >
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>

      <Form.Item
        name="longTest"
        label="Long Test"
        help={<FieldErrorMessages path="longTest" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "longTest") ? "error" : "success"}
      >
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>

      <Form.Item
        name="longPrimitive"
        label="Long Primitive"
        help={
          <FieldErrorMessages path="longPrimitive" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "longPrimitive") ? "error" : "success"
        }
      >
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>

      <Form.Item
        name="bigDecimal"
        label="Big Decimal"
        help={
          <FieldErrorMessages path="bigDecimal" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "bigDecimal") ? "error" : "success"
        }
      >
        <InputNumber type="number" stringMode />
      </Form.Item>

      <Form.Item
        name="localDate"
        label="Local Date"
        help={<FieldErrorMessages path="localDate" fieldErrors={fieldErrors} />}
        validateStatus={
          hasError(fieldErrors, "localDate") ? "error" : "success"
        }
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="localDateTime"
        label="Local Date Time"
        help={
          <FieldErrorMessages path="localDateTime" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "localDateTime") ? "error" : "success"
        }
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item
        name="localTime"
        label="Local Time"
        help={<FieldErrorMessages path="localTime" fieldErrors={fieldErrors} />}
        validateStatus={
          hasError(fieldErrors, "localTime") ? "error" : "success"
        }
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        name="offsetDateTime"
        label="Offset Date Time"
        help={
          <FieldErrorMessages path="offsetDateTime" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "offsetDateTime") ? "error" : "success"
        }
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item
        name="offsetTime"
        label="Offset Time"
        help={
          <FieldErrorMessages path="offsetTime" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "offsetTime") ? "error" : "success"
        }
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        name="dateTest"
        label="Date Test"
        help={<FieldErrorMessages path="dateTest" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "dateTest") ? "error" : "success"}
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item
        name="url"
        label="Url"
        help={<FieldErrorMessages path="url" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "url") ? "error" : "success"}
      >
        <Input type="url" />
      </Form.Item>
    </>
  );
}

/**
 * return true if fieldErrors contains error for field specified in path
 *
 * @param fieldErrors form field errors
 * @param path field path
 */
function hasError(fieldErrors: FieldError[], path: string) {
  return fieldErrors.some(fieldError => fieldError.path === path);
}

/**
 * List of error messages in form field
 *
 * @param path field path
 * @param fieldErrors form field errors
 * @constructor
 */
function FieldErrorMessages({
  path,
  fieldErrors
}: {
  path: string;
  fieldErrors: FieldError[];
}) {
  if (hasError(fieldErrors, path)) {
    return (
      <>
        {fieldErrors
          .find(fieldError => fieldError.path === path)!
          .messages.map(msg => (
            <div>{msg}</div>
          ))}
      </>
    );
  }

  return <></>;
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

  const item: ItemType = useMemo(() => deserialize(data?.scalarsTestEntity), [
    data
  ]);

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
