import { MutationFn } from "../type-aliases/MutationFn";
import { RefetchQueries } from "../type-aliases/RefetchQueries";

/**
 * Returns a Promise that deletes an entity instance.
 * Can be used, for example, on a "Delete" button in an entity list component.
 *
 * @param runDeleteMutation a function that invokes a delete mutation
 * @param id id of the entity instance that should be deleted
 * @param refetchQueries queries that needs to be refetched after the item is deleted
 */
export function useDeleteItem(
  id: string | null | undefined,
  runDeleteMutation: MutationFn<any, any>,
  refetchQueries?: RefetchQueries
) {
  /**
   * Callback that is invoked when the user confirms the intention to delete the item.
   */
  function handleConfirm() {
    if (id == null) {
      throw new Error("Can't perform delete mutation with id = 'null'");
    }

    return runDeleteMutation({
      variables: {
        id
      },
      refetchQueries
    });
  }

  return handleConfirm;
}
