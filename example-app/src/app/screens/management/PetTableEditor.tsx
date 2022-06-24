import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Select,
  message,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/es/form/Form";
import { EntityLookupField } from "../../../core/crud/entity-lookup-field/EntityLookupField";
import { DatePicker } from "@amplicode/react";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetDescriptionDTODisplayName } from "../../../core/display-name/getPetDescriptionDTODisplayName";
import { getTagDTODisplayName } from "../../../core/display-name/getTagDTODisplayName";
import { getPetDiseaseDTODisplayName } from "../../../core/display-name/getPetDiseaseDTODisplayName";
import { gql } from "../../../gql";
import { useNavigate, useParams } from "react-router-dom";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useSubmitEditor } from "../../../core/crud/useSubmitEditor";
import { ErrorMessage } from "../../../core/crud/ErrorMessage";
import { FormattedMessage, useIntl } from "react-intl";
import { RefetchQueries } from "../../../core/type-aliases/RefetchQueries";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";

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
        <FormFields item={item} />
        <ErrorMessage errorMessage={formError} />
        <FormButtons submitting={submitting} />
      </Form>
    </Card>
  );
}

function FormFields({ item }: { item?: ItemType }) {
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
          drawerTitle="Type"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={<YourEntityLookupComponentName/>}
        />
      </Form.Item>

      <Form.Item name="owner" label="Owner">
        <EntityLookupField
          getDisplayName={getOwnerDTODisplayName}
          drawerTitle="Owner"
          // TODO Uncomment the code and specify the list component
          // lookupComponent={<YourEntityLookupComponentName/>}
        />
      </Form.Item>

      <Form.Item name="description" label="Description">
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
        getValueProps={object => ({
          value:
            object == null
              ? undefined
              : object.map((entry: Record<string, unknown>) =>
                  getTagDTODisplayName(entry)
                )
        })}
      >
        <Select mode="tags" disabled />
      </Form.Item>

      <Form.Item
        name="diseases"
        label="Diseases"
        getValueProps={object => ({
          value:
            object == null
              ? undefined
              : object.map((entry: Record<string, unknown>) =>
                  getPetDiseaseDTODisplayName(entry)
                )
        })}
      >
        <Select mode="tags" disabled />
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
  const [loadItem, { loading, error, data }] = useLazyQuery(PET, {
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
