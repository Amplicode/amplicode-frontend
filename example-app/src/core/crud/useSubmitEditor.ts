import {
  ApolloError,
  FetchResult,
  InternalRefetchQueriesInclude,
  TypedDocumentNode,
  useMutation
} from "@apollo/client";
import { useIntl } from "react-intl";
import { message } from "antd";
import { GraphQLError } from "graphql/error/GraphQLError";
import { useCallback } from "react";
import { useCloseNestedScreen } from "./useCloseNestedScreen";
import {serializeCustomScalars} from "../transform/model/serializeCustomScalars";

/**
 * Returns an object containing `handleSubmit` callback that is executed after user clicks `Submit` button on an editor form
 * and client-side validation is successful, and `submitting` boolean indicating whether submit is in progress.
 *
 * @param mutation
 * @param setFormError
 * @param refetchQueries
 * @param id entity instance id (when editing an entity, otherwise undefined)
 */
export function useSubmitEditor<TData>(
  // TODO change to single object arg
  mutation: TypedDocumentNode,
  setFormError: (message: string) => void,
  refetchQueries:
    | ((result: FetchResult<TData>) => InternalRefetchQueriesInclude)
    | InternalRefetchQueriesInclude
    | undefined,
  id?: string,
  typename?: string
) {
  const intl = useIntl();
  const closeEditor = useCloseNestedScreen();

  // Get the function that will run the mutation
  // and a boolean indicating that submit is in progress
  const [runMutation, { loading: submitting }] = useMutation(mutation, {
    refetchQueries
  });

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
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }

  /**
   * Function that is executed when mutation results in a network error (such as 4xx or 5xx).
   *
   * @param error
   */
  function handleNetworkError(error: Error | ApolloError) {
    setFormError(error.message);
    console.error(error);
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
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
        ...serializeCustomScalars(formFieldValues, typename),
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
}
