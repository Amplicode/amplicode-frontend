import { useMemo, useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  message,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/es/form/Form";
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

const OWNER = gql(`
  query Get_Owner($id: ID) {
    owner(id: $id) {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }
`);

const UPDATE_OWNER = gql(`
  mutation Update_Owner($input: OwnerInputDTO) {
    updateOwner(input: $input) {
      id
    }
  }
`);

export interface OwnerListEditorProps<TData = any> {
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function OwnerListEditor({
  refetchQueries
}: OwnerListEditorProps<QueryResultType>) {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.OwnerListEditor" }));

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
    UPDATE_OWNER,
    setFormErrors,
    setFieldErrors,
    refetchQueries,
    "OwnerInputDTO",
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
        name="firstName"
        label="First Name"
        help={<FieldErrorMessages path="firstName" fieldErrors={fieldErrors} />}
        validateStatus={
          hasError(fieldErrors, "firstName") ? "error" : "success"
        }
      >
        <Input autoFocus />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        help={<FieldErrorMessages path="lastName" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "lastName") ? "error" : "success"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        help={<FieldErrorMessages path="city" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "city") ? "error" : "success"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        help={<FieldErrorMessages path="address" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "address") ? "error" : "success"}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="telephone"
        label="Telephone"
        help={<FieldErrorMessages path="telephone" fieldErrors={fieldErrors} />}
        validateStatus={
          hasError(fieldErrors, "telephone") ? "error" : "success"
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        help={<FieldErrorMessages path="email" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "email") ? "error" : "success"}
      >
        <Input />
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
  const [loadItem, { loading, error, data }] = useLazyQuery(OWNER, {
    variables: {
      id
    }
  });

  // Load item if `id` has been provided in props
  useEffect(() => {
    if (id != null && id !== "new") {
      loadItem();
    }
  }, [loadItem, id]);

  const item = useMemo(() => deserialize(data?.owner), [data?.owner]);

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
type QueryResultType = ResultOf<typeof OWNER>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["owner"];
