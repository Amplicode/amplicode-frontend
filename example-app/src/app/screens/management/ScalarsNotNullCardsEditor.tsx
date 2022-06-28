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
import { ErrorMessage } from "../../../core/crud/ErrorMessage";
import { FormattedMessage, useIntl } from "react-intl";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

const NOT_NULL_SCALARS_TEST_ENTITY = gql(`
  query Get_NN_Scalars($id: ID) {
    notNullScalarsTestEntity(id: $id) {
      id
      bigDecimalNotNull
      bigIntNotNull
      dateTestNotNull
      localDateNotNull
      localDateTimeNotNull
      localTimeNotNull
      offsetDateTimeNotNull
      offsetTimeNotNull
      stringNotNull
      urlNotNull
    }
  }
`);

const UPDATE_NOT_NULL_SCALARS_TEST_ENTITY = gql(`
  mutation Update_NN_Scalars($input: NotNullScalarsTestEntityInput) {
    updateNotNullScalarsTestEntity(input: $input) {
      id
    }
  }
`);

export interface ScalarsNotNullCardsEditorProps<TData = any> {
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function ScalarsNotNullCardsEditor({
  refetchQueries
}: ScalarsNotNullCardsEditorProps<QueryResultType>) {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.ScalarsNotNullCardsEditor" })
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
    UPDATE_NOT_NULL_SCALARS_TEST_ENTITY,
    setFormErrors,
    setFieldErrors,
    refetchQueries,
    "NotNullScalarsTestEntityInput",
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
        {formErrors.map(errorMessage => (
          <ErrorMessage errorMessage={errorMessage} />
        ))}
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
        name="bigDecimalNotNull"
        label="Big Decimal Not Null"
        help={
          <FieldErrorMessages
            path="bigDecimalNotNull"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "bigDecimalNotNull") ? "error" : "success"
        }
      >
        <InputNumber type="number" stringMode autoFocus />
      </Form.Item>

      <Form.Item
        name="bigIntNotNull"
        label="Big Int Not Null"
        help={
          <FieldErrorMessages path="bigIntNotNull" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "bigIntNotNull") ? "error" : "success"
        }
      >
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>

      <Form.Item
        name="dateTestNotNull"
        label="Date Test Not Null"
        help={
          <FieldErrorMessages
            path="dateTestNotNull"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "dateTestNotNull") ? "error" : "success"
        }
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item
        name="localDateNotNull"
        label="Local Date Not Null"
        help={
          <FieldErrorMessages
            path="localDateNotNull"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "localDateNotNull") ? "error" : "success"
        }
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="localDateTimeNotNull"
        label="Local Date Time Not Null"
        help={
          <FieldErrorMessages
            path="localDateTimeNotNull"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "localDateTimeNotNull") ? "error" : "success"
        }
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item
        name="localTimeNotNull"
        label="Local Time Not Null"
        help={
          <FieldErrorMessages
            path="localTimeNotNull"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "localTimeNotNull") ? "error" : "success"
        }
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        name="offsetDateTimeNotNull"
        label="Offset Date Time Not Null"
        help={
          <FieldErrorMessages
            path="offsetDateTimeNotNull"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "offsetDateTimeNotNull") ? "error" : "success"
        }
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item
        name="offsetTimeNotNull"
        label="Offset Time Not Null"
        help={
          <FieldErrorMessages
            path="offsetTimeNotNull"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "offsetTimeNotNull") ? "error" : "success"
        }
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        name="stringNotNull"
        label="String Not Null"
        help={
          <FieldErrorMessages path="stringNotNull" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "stringNotNull") ? "error" : "success"
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="urlNotNull"
        label="Url Not Null"
        help={
          <FieldErrorMessages path="urlNotNull" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "urlNotNull") ? "error" : "success"
        }
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
  const [item, setItem] = useState<ItemType | null>();

  // Get the function that will load item from server,
  // also get variables that will contain loading/error state and response data
  // once the response is received
  const [loadItem, { loading, error, data }] = useLazyQuery(
    NOT_NULL_SCALARS_TEST_ENTITY,
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
    if (data?.notNullScalarsTestEntity != null) {
      setItem(deserialize(data?.notNullScalarsTestEntity));
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
type QueryResultType = ResultOf<typeof NOT_NULL_SCALARS_TEST_ENTITY>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["notNullScalarsTestEntity"];
