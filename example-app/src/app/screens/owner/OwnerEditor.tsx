import React, { useCallback, useEffect, useState } from "react";
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
import { gql } from "@amplicode/gql";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useSubmit } from "../../../core/crud/useSubmit";
import { ErrorMessage } from "../../../core/crud/ErrorMessage";
import { useCloseNestedScreen } from "../../../core/crud/useCloseNestedScreen";
import { FormattedMessage, useIntl } from "react-intl";
import { gql2form } from "../../../core/format/gql2form";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";

const OWNER = gql(/* GraphQL */ `
  query Get_Owner($id: BigInteger) {
    owner(id: $id) {
      id
      firstName
      lastName
      city
      address
      email
      telephone
    }
  }
`);

const UPDATE__OWNER = gql(/* GraphQL */ `
  mutation Update_Owner($input: OwnerInputDTOInput) {
    update_Owner(input: $input) {
      id
    }
  }
`);

export interface OwnerEditorProps<TData = any> {
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

export function OwnerEditor({
  id,
  refetchQueries
}: OwnerEditorProps<QueryResultType>) {
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
   * See {@link EntityDetailsScreenProps.id}
   */
  id?: string;
  /**
   * See {@link EntityDetailsScreenProps.refetchQueries}
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

  const { handleSubmit, submitting } = useSubmit(
    UPDATE__OWNER,
    setFormError,
    refetchQueries,
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
      <Form.Item
        name="address"
        label="Address"
        style={{ marginBottom: "12px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item name="city" label="City" style={{ marginBottom: "12px" }}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" style={{ marginBottom: "12px" }}>
        <Input />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First Name"
        style={{ marginBottom: "12px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        style={{ marginBottom: "12px" }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="telephone"
        label="Telephone"
        style={{ marginBottom: "12px" }}
      >
        <Input />
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
    <Form.Item style={{ textAlign: "center" }}>
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
  const [loadItem, { loading, error, data }] = useLazyQuery(OWNER, {
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
    if (data?.owner != null) {
      setItem(data?.owner);
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
export function useFormData<ItemType extends Record<string, unknown> | null>(
  form: FormInstance,
  item?: ItemType
) {
  useEffect(() => {
    if (item != null) {
      const fieldValues = gql2form(item);
      form.setFieldsValue(fieldValues);
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
