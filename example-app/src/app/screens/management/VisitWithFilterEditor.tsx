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
import { EntityLookupField } from "../../../core/crud/entity-lookup-field/EntityLookupField";
import { DatePicker } from "@amplicode/react";
import { getPetDTODisplayName } from "../../../core/display-name/getPetDTODisplayName";
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

const VISIT = gql(`
  query Get_Visit($id: ID) {
  visit(id: $id) {
    description
    id
    pet {
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
    }
    visitEnd
    visitStart
  }
}
`);

const UPDATE_VISIT = gql(`
  mutation Update_Visit($input: VisitInputDTO) {
  updateVisit(input: $input) {
    id
  }
}
`);

export interface VisitWithFilterEditorProps<TData = any> {
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function VisitWithFilterEditor({
  refetchQueries
}: VisitWithFilterEditorProps<QueryResultType>) {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.VisitWithFilterEditor" }));

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
    UPDATE_VISIT,
    setFormErrors,
    setFieldErrors,
    refetchQueries,
    "VisitInputDTO",
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
        name="description"
        label="Description"
        help={
          <FieldErrorMessages path="description" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "description") ? "error" : "success"
        }
      >
        <Input autoFocus />
      </Form.Item>

      <Form.Item
        name="pet"
        label="Pet"
        help={<FieldErrorMessages path="pet" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "pet") ? "error" : "success"}
      >
        <EntityLookupField
          getDisplayName={getPetDTODisplayName}
          drawerTitle="Pet"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={<YourEntityLookupComponentName/>}
        />
      </Form.Item>

      <Form.Item
        name="visitEnd"
        label="Visit End"
        help={<FieldErrorMessages path="visitEnd" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "visitEnd") ? "error" : "success"}
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>

      <Form.Item
        name="visitStart"
        label="Visit Start"
        help={
          <FieldErrorMessages path="visitStart" fieldErrors={fieldErrors} />
        }
        validateStatus={
          hasError(fieldErrors, "visitStart") ? "error" : "success"
        }
      >
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
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
  const [loadItem, { loading, error, data }] = useLazyQuery(VISIT, {
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

  const item = useMemo(() => deserialize(data?.visit), [data?.visit]);

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
type QueryResultType = ResultOf<typeof VISIT>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["visit"];
