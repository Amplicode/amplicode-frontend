import {gql} from "../../../gql";
import {guessDisplayName} from "@amplicode/react-core";
import React, {useEffect, useState} from "react";
import {Card, Form, Input, Spin} from "antd";
import {useLazyQuery} from "@apollo/client";
import {useForm} from "antd/es/form/Form";
import {EntityLookupField} from "@amplicode/react-antd";
import {ResultOf} from "@graphql-typed-document-node/core";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import {RefetchQueries} from "../../../core/type-aliases/RefetchQueries";
import { useSubmit } from "../../../core/crud/useSubmit";
import {useFormData} from "../../../core/crud/useFormData";
import {useClientValidationFailed} from "../../../core/crud/useClientValidationFailed";
import { FormButtons } from "../../../core/crud/FormButtons";
import { ErrorMessage } from "../../../core/crud/ErrorMessage";

const GET_PET = gql(/* GraphQL */ `
  query Get_Pet($id: BigInteger) {
    pet(id: $id) {
      id
      identificationNumber
      owner {
        firstName
        lastName
      }
    }
  }
`);

const UPDATE_PET = gql(/* GraphQL */ `
  mutation Update_Pet($input: PetInputDTOInput) {
    update_Pet(input: $input) {
      id
    }
  }
`);

export function PetEditor({ id, refetchQueries }: EntityDetailsScreenProps<QueryResultType>) {
  // Load the item if `id` is provided
  const {item, itemLoading, itemError} = useLoadItem(id);

  if (itemLoading) {
    return <Spin />;
  }

  if (itemError) {
    return <RequestFailedError />;
  }

  return (
    <EditorForm item={item}
                id={id}
                refetchQueries={refetchQueries}
    />
  );
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
  refetchQueries?: RefetchQueries<TData>,
}

function EditorForm<TData>({item, refetchQueries, id}: EditorFormProps<TData>) {
  const [form] = useForm();

  // Global error message, i.e. error message not related to a particular form field.
  // Examples: cross-validation, network errors.
  const [formError, setFormError] = useState<string | undefined>();

  const {handleSubmit, submitting} = useSubmit(UPDATE_PET, setFormError, refetchQueries, id);
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
        name="birthDate"
        label="Birth Date"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="identificationNumber"
        label="Identification Number"
      >
        <Input />
      </Form.Item>

      <Form.Item name="owner" label="Owner" >
        <EntityLookupField
          getDisplayName={guessDisplayName}
          label="Owner"
          // TODO Uncomment the code and specify the list component
          // listComponent={YourEntityListComponentName}
        />
      </Form.Item>

      <Form.Item name="type" label="Type" >
        <EntityLookupField
          getDisplayName={guessDisplayName}
          label="Type"
          // TODO Uncomment the code and specify the list component
          // listComponent={YourEntityListComponentName}
        />
      </Form.Item>
    </>
  );
}

/**
 * Loads the item if `id` is provided
 *
 * @param id
 */
export function useLoadItem(id?: string) {
  const [item, setItem] = useState<ItemType | null>();

  // Get the function that will load item from server,
  // also get variables that will contain loading/error state and response data
  // once the response is received
  const [loadItem, { loading, error, data }] = useLazyQuery(GET_PET, {
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
      setItem(data?.pet);
    }
  }, [data, setItem]);

  return {
    item,
    itemLoading: loading,
    itemError: error,
  };
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof GET_PET>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType['pet'];

// TODO This will reside in react-core once we move @apollo/client into react-core
interface EntityDetailsScreenProps<TData> {
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