import {gql} from "../../../gql";
import {guessDisplayName, useScreens} from "@amplicode/react-core";
import React, {useCallback, useEffect, useState} from "react";
import {Alert, Button, Card, Form, FormInstance, Input, message, Result, Space, Spin} from "antd";
import {ApolloError, FetchResult, InternalRefetchQueriesInclude, useLazyQuery, useMutation} from "@apollo/client";
import {useForm} from "antd/es/form/Form";
import {FormattedMessage, useIntl} from "react-intl";
import {EntityLookupField} from "@amplicode/react-antd";
import {useHistory} from "react-router-dom";
import { gql2form } from "../../../core/form/gql2form";
import {GraphQLError} from "graphql/error/GraphQLError";
import { form2gql } from "../../../core/form/form2gql";
import {ResultOf} from "@graphql-typed-document-node/core";

const GET_PET = gql(/* GraphQL */ `
  query Get_Pet($id: Long) {
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

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof GET_PET>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = QueryResultType['pet'];

export function RefactoredPetEditor({ id, refetchQueries }: EntityDetailsScreenProps<QueryResultType>) {
  // Load the item if `id` is provided
  const {item, itemLoading, itemError} = useItem(id);

  if (itemLoading) {
    return <Spin />;
  }

  if (itemError) {
    return <LoadingFailedError />;
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
  refetchQueries?: ((result: FetchResult<TData>) => InternalRefetchQueriesInclude) | InternalRefetchQueriesInclude,
}

function EditorForm<TData>({item, refetchQueries, id}: EditorFormProps<TData>) {
  const [form] = useForm();
  const [formError, setFormError] = useState<string | undefined>();
  const {handleSubmit, submitting} = useSubmit(setFormError, refetchQueries, id);
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
        <FormErrors errorMessage={formError} />
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
          getDisplayName={(value: Record<string, unknown>) =>
            guessDisplayName(value)
          }
          label="Owner"
          // TODO Uncomment the code and specify the list component
          // listComponent={YourEntityListComponentName}
        />
      </Form.Item>

      <Form.Item name="type" label="Type" >
        <EntityLookupField
          getDisplayName={(value: Record<string, unknown>) =>
            guessDisplayName(value)
          }
          label="Type"
          // TODO Uncomment the code and specify the list component
          // listComponent={YourEntityListComponentName}
        />
      </Form.Item>
    </>
  );
}

function LoadingFailedError() {
  return (
    <Result
      status="error"
      title={<FormattedMessage id="common.requestFailed"/>}
    />
  );
}

interface FormErrorsProps {
  errorMessage?: string
}

/**
 * Displays global error messages, i.e. error messages not related to a particular form field.
 * Examples: cross-validation, network errors.
 *
 * @param errorMessage
 * @constructor
 */
function FormErrors({errorMessage}: FormErrorsProps) {
  if (errorMessage == null) {
    return null;
  }

  return (
    <Alert
      message={errorMessage}
      type="error"
    />
  );
}

interface FormButtonsProps {
  submitting?: boolean;
}

function FormButtons({submitting}: FormButtonsProps) {
  const closeEditor = useCloseEditor();

  return (
    <Form.Item style={{textAlign: 'center'}}>
      <Space>
        <Button htmlType="button" onClick={closeEditor}>
          <FormattedMessage id="common.cancel" />
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
        >
          <FormattedMessage id={"common.submit"} />
        </Button>
      </Space>
    </Form.Item>
  );
}

/**
 * Returns a callback that closes the editor and returns the user to parent screen.
 */
function useCloseEditor() {
  const history = useHistory();
  const screens = useScreens();

  return useCallback(() => {
    history.push("."); // Remove entity id part from url
    screens.closeActiveBreadcrumb();
  }, [screens, history]);
}

/**
 * Returns a callback that is executed after user clicks `Submit` button
 * and client-side validation is successful.
 *
 * @param setFormError
 * @param refetchQueries See {@link EntityDetailsScreenProps.refetchQueries}
 * @param id entity instance id (when editing an entity)
 */
function useSubmit<TData>(
  setFormError: (message: string) => void,
  refetchQueries: ((result: FetchResult<TData>) => InternalRefetchQueriesInclude) | InternalRefetchQueriesInclude | undefined,
  id?: string) {
  const intl = useIntl();
  const closeEditor = useCloseEditor();

  const [runMutation, { loading: submitting }] = useMutation(
    UPDATE_PET,
    {
      refetchQueries
    }
  );

  /**
   * Function that is executed when mutation is successful
   */
  function handleSuccess() {
    closeEditor();
    return message.success(
      intl.formatMessage({
        id: "EntityDetailsScreen.savedSuccessfully"
      })
    );
  }

  /**
   * Function that is executed when mutation results in a GraphQL error
   *
   * @param errors
   */
  function handleGraphQLError(errors: ReadonlyArray<GraphQLError>) {
    setFormError(errors.join("\n"));
    console.error(errors);
    return message.error(
      intl.formatMessage({ id: "common.requestFailed" })
    );
  }

  /**
   * Function that is executed when mutation results in a network error (such as 4xx or 5xx).
   *
   * @param error
   */
  function handleNetworkError(error: Error | ApolloError) {
    setFormError(error.message);
    console.error(error);
    return message.error(
      intl.formatMessage({ id: "common.requestFailed" })
    );
  }

  /**
   * Callback that is executed when a user clicks `Submit` button.
   */
  const handleSubmit = useCallback(
    (formFieldValues: Record<string, unknown>) => {
      /*
       * Constructing the object that will be sent to backend.
       * We take the values from the form (`formFieldValues`),
       * transform them from the format used by the form to the format used by GraphQL,
       * and add `id` property (if it is defined).
       *
       * Presence of `id` property indicates editing an existing entity instance.
       * Otherwise a new instance will be created.
       */
      const input = {
        ...form2gql(formFieldValues),
        id: id
      };

      // Execute mutation and handle the result
      runMutation({
        variables: {
          input
        }
      })
        .then(({ errors }: FetchResult) => {
          if (errors == null || errors.length === 0) {
            return handleSuccess();
          }
          return handleGraphQLError(errors);
        })
        .catch(handleNetworkError);
    },
    [runMutation, intl, closeEditor, id]
  );

  return {
    handleSubmit,
    submitting
  };
};

function useClientValidationFailed() {
  const intl = useIntl();

  return useCallback(() => {
    return message.error(
      intl.formatMessage({ id: "EntityDetailsScreen.validationError" })
    );
  }, [intl]);
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
      const fieldValues = gql2form(item);
      form.setFieldsValue(fieldValues);
    }
  }, [item, form]);
}

/**
 * Loads the item if `id` is provided
 *
 * @param id
 */
function useItem(id?: string) {
  const [item, setItem] = useState<ItemType | null>();

  // Get the function that requests the item from server,
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
  refetchQueries?: ((result: FetchResult<TData>) => InternalRefetchQueriesInclude) | InternalRefetchQueriesInclude;
}