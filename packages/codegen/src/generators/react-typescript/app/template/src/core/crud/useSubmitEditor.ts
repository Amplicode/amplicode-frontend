import {
  ApolloError,
  FetchResult,
  InternalRefetchQueriesInclude,
  DocumentNode,
  useMutation
} from "@apollo/client";
import { useIntl } from "react-intl";
import { message } from "antd";
import { GraphQLError } from "graphql/error/GraphQLError";
import { useCallback } from "react";
import { serialize } from "../transform/model/serialize";
import { useNavigate } from "react-router-dom";

export interface FieldError {
  path: string;
  messages: string[];
}

/**
 * Returns an object containing `handleSubmit` callback that is executed after user clicks `Submit` button on an editor form
 * and client-side validation is successful, and `submitting` boolean indicating whether submit is in progress.
 *
 * @param mutation
 * @param setFormErrors set global form errors
 * @param setFieldErrors set errors related to fields
 * @param refetchQueries
 * @param typename GraphQL input type name
 * @param idFieldName name of id field
 * @param id entity instance id (when editing an entity, otherwise undefined)
 */
export function useSubmitEditor<TData>(
  mutation: DocumentNode,
  setFormErrors: (message: string[]) => void,
  setFieldErrors: (fieldErrors: FieldError[]) => void,
  refetchQueries:
    | ((result: FetchResult<TData>) => InternalRefetchQueriesInclude)
    | InternalRefetchQueriesInclude
    | undefined,
  typename: string,
  id?: string,
  idFieldName: string = "id"
) {
  const intl = useIntl();
  const navigate = useNavigate();

  // Get the function that will run the mutation
  // and a boolean indicating that submit is in progress
  const [runMutation, { loading: submitting }] = useMutation(mutation, {
    refetchQueries
  });

  /**
   * Function that is executed when mutation is successful
   */
  const handleSuccess = useCallback(() => {
    navigate("..");
    return message.success(
      intl.formatMessage({
        id: "EntityDetailsScreen.savedSuccessfully"
      })
    );
  }, [navigate, intl]);

  /**
   * Function that is executed when mutation results in a GraphQL error
   *
   * @param errors
   */
  const handleGraphQLError = useCallback(
    (errors: ReadonlyArray<GraphQLError>) => {
      let formErrors: string[] = [];
      let fieldErrors: FieldError[] = [];

      errors.forEach(error => {
        if (isFieldError(error)) {
          const path = error.extensions.path[0];
          if (fieldErrors.some(fieldError => fieldError.path === path)) {
            //error with such path already exist in fieldErrors - add message to array
            fieldErrors
              .find(fieldError => fieldError.path === path)!
              .messages.push(error.message);
          } else {
            //error with such path not exist in fieldErrors - create new field error
            fieldErrors.push({ messages: [error.message], path });
          }
        } else {
          // global error
          formErrors.push(error.message);
        }
      });

      setFormErrors(formErrors);
      setFieldErrors(fieldErrors);
      return message.error(intl.formatMessage({ id: "common.requestFailed" }));
    },
    [intl, setFieldErrors, setFormErrors]
  );

  /**
   * Function that is executed when mutation results in a network error (such as 4xx or 5xx).
   *
   * @param error
   */
  const handleNetworkError = useCallback(
    (error: Error | ApolloError) => {
      setFormErrors([error.message]);
      console.error(error);
      return message.error(intl.formatMessage({ id: "common.requestFailed" }));
    },
    [intl, setFormErrors]
  );

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
      let input = serialize(formFieldValues, typename);
      input[idFieldName] = id !== "new" ? id : undefined;

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
        .catch(error => {
          if (error.graphQLErrors != null && error.graphQLErrors.length > 0) {
            return handleGraphQLError(error.graphQLErrors);
          }
          return handleNetworkError(error);
        });
    },
    [
      id,
      runMutation,
      handleNetworkError,
      handleGraphQLError,
      handleSuccess,
      typename,
      idFieldName
    ]
  );

  return {
    handleSubmit,
    submitting
  };
}

function isFieldError(error: GraphQLError): boolean {
  return (
    error.extensions?.classification != null &&
    error.extensions.classification === "BeanValidationError" &&
    error.extensions.path?.length > 0 &&
    error.extensions.path[0] !== ""
  );
}
