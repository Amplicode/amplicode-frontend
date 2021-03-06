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
import { EntityRelationsField } from "../../../core/crud/entity-relations-field/EntityRelationsField";
import { DatePicker } from "@amplicode/react";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetDescriptionDTODisplayName } from "../../../core/display-name/getPetDescriptionDTODisplayName";
import { getTagDTODisplayName } from "../../../core/display-name/getTagDTODisplayName";
import { getPetDiseaseDTODisplayName } from "../../../core/display-name/getPetDiseaseDTODisplayName";
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

const PET = gql(`
  query Get_Pet($id: ID!) {
    pet(id: $id) {
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
      description {
        identifier
        description
      }
      tags {
        id
        name
      }
      diseases {
        petDiseaseIdentifier
        name
        description
      }      
    }
  }
`);

const UPDATE_PET = gql(`
  mutation Update_Pet($input: PetInputDTO) {
    updatePet(input: $input) {
      id
    }
  }
`);

export interface PetTableEditorProps<TData = any> {
  /**
   * A list of queries that needs to be refetched once the editor has been submitted.
   * For example, you might need to refresh entity list after editing an entity instance.
   * In simple cases this would be just an array of query names, e.g. ["Get_Pet_List"],
   * or an array of `DocumentNode`s, e.g. [PET_LIST].
   * For more info, check Apollo Client documentation.
   */
  refetchQueries?: RefetchQueries<TData>;
}

export function PetTableEditor({
  refetchQueries
}: PetTableEditorProps<QueryResultType>) {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.PetTableEditor" }));

  const { recordId } = useParams();

  if (recordId == null) throw new Error("recordId must be defined");
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
    UPDATE_PET,
    setFormErrors,
    setFieldErrors,
    refetchQueries,
    "PetInputDTO",
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
        name="identificationNumber"
        label="Identification Number"
        help={
          <FieldErrorMessages
            path="identificationNumber"
            fieldErrors={fieldErrors}
          />
        }
        validateStatus={
          hasError(fieldErrors, "identificationNumber") ? "error" : "success"
        }
      >
        <Input autoFocus />
      </Form.Item>

      <Form.Item
        name="birthDate"
        label="Birth Date"
        help={<FieldErrorMessages path="birthDate" fieldErrors={fieldErrors} />}
        validateStatus={
          hasError(fieldErrors, "birthDate") ? "error" : "success"
        }
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
        help={<FieldErrorMessages path="type" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "type") ? "error" : "success"}
      >
        <EntityLookupField
          getDisplayName={getPetTypeDTODisplayName}
          drawerTitle="Type"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={<YourEntityLookupComponentName/>}
        />
      </Form.Item>

      <Form.Item
        name="owner"
        label="Owner"
        help={<FieldErrorMessages path="owner" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "owner") ? "error" : "success"}
      >
        <EntityLookupField
          getDisplayName={getOwnerDTODisplayName}
          drawerTitle="Owner"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={<YourEntityLookupComponentName/>}
        />
      </Form.Item>

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
        <EntityLookupField
          getDisplayName={getPetDescriptionDTODisplayName}
          drawerTitle="Description"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={<YourEntityLookupComponentName/>}
        />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        help={<FieldErrorMessages path="tags" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "tags") ? "error" : "success"}
        getValueProps={object => ({
          value:
            object == null
              ? undefined
              : object.map((entry: Record<string, unknown>) =>
                  getTagDTODisplayName(entry)
                )
        })}
      >
        <EntityRelationsField />
      </Form.Item>

      <Form.Item
        name="diseases"
        label="Diseases"
        help={<FieldErrorMessages path="diseases" fieldErrors={fieldErrors} />}
        validateStatus={hasError(fieldErrors, "diseases") ? "error" : "success"}
        getValueProps={object => ({
          value:
            object == null
              ? undefined
              : object.map((entry: Record<string, unknown>) =>
                  getPetDiseaseDTODisplayName(entry)
                )
        })}
      >
        <EntityRelationsField />
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
function useLoadItem(id: string) {
  // Get the function that will load item from server,
  // also get variables that will contain loading/error state and response data
  // once the response is received
  const [loadItem, { loading, error, data }] = useLazyQuery(PET, {
    variables: {
      id
    }
  });

  // Load item if `id` has been provided in props
  useEffect(() => {
    if (id !== "new") {
      loadItem();
    }
  }, [loadItem, id]);

  const item = useMemo(() => deserialize(data?.pet), [data?.pet]);

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
type QueryResultType = ResultOf<typeof PET>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["pet"];
