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
import {useNavigate} from "react-router-dom";

/**
 * Returns an object containing `handleSubmit` callback that is executed after user clicks `Submit` button on an editor form
 * and client-side validation is successful, and `submitting` boolean indicating whether submit is in progress.
 *
 * @param mutation
 * @param setFormError
 * @param refetchQueries
 * @param typename GraphQL input type name
 * @param idFieldName name of id field
 * @param id entity instance id (when editing an entity, otherwise undefined)
 */
export function useSubmitEditor<TData>(
  mutation: DocumentNode,
  setFormError: (message: string) => void,
  refetchQueries:
    | ((result: FetchResult<TData>) => InternalRefetchQueriesInclude)
    | InternalRefetchQueriesInclude
    | undefined,
  typename: string,
  id?: string,
  idFieldName: string = "id",
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
      setFormError(errors.join("\n"));
      console.error(errors);
      return message.error(intl.formatMessage({ id: "common.requestFailed" }));
    },
    [intl, setFormError]
  );

  /**
   * Function that is executed when mutation results in a network error (such as 4xx or 5xx).
   *
   * @param error
   */
  const handleNetworkError = useCallback(
    (error: Error | ApolloError) => {
      setFormError(error.message);
      console.error(error);
      return message.error(intl.formatMessage({ id: "common.requestFailed" }));
    },
    [intl, setFormError]
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
        .catch(handleNetworkError);
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
