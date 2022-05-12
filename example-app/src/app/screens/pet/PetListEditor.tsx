import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  DatePicker,
  message,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/es/form/Form";
import { EntityLookupField } from "@amplicode/react-antd";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { gql } from "@amplicode/gql";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useSubmitEditor } from "../../../core/crud/useSubmitEditor";
import { ErrorMessage } from "../../../core/crud/ErrorMessage";
import { useCloseNestedScreen } from "../../../core/crud/useCloseNestedScreen";
import { FormattedMessage, useIntl } from "react-intl";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";
import { deserialize } from "../../../core/transform/model/deserialize";

const PET = gql(`
  query Get_Pet($id: ID) {
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

export interface PetListEditorProps<TData = any> {
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

export function PetListEditor({
  id,
  refetchQueries
}: PetListEditorProps<QueryResultType>) {
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
    UPDATE_PET,
    setFormError,
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
      <Form.Item name="identificationNumber" label="Identification Number">
        <Input autoFocus />
      </Form.Item>

      <Form.Item name="birthDate" label="Birth Date">
        <DatePicker />
      </Form.Item>

      <Form.Item name="type" label="Type">
        <EntityLookupField
          getDisplayName={getPetTypeDTODisplayName}
          label="Type"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={YourEntityListComponentName}
        />
      </Form.Item>

      <Form.Item name="owner" label="Owner">
        <EntityLookupField
          getDisplayName={getOwnerDTODisplayName}
          label="Owner"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={YourEntityListComponentName}
        />
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
  const [loadItem, { loading, error, data }] = useLazyQuery(PET, {
    variables: {
      id
    }
  });

  // Load item if `id` has been provided in props
  useEffect(() => {
    if (id != null) {
      loadItem();
    }
  }, [loadItem, id]);

  // Get the received item, if any
  useEffect(() => {
    if (data?.pet != null) {
      setItem(deserialize(data?.pet));
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
type QueryResultType = ResultOf<typeof PET>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType["pet"];
