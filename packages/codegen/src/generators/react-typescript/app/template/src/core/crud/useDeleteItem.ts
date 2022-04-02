import { MutationFn } from "../type-aliases/MutationFn";
import { useIntl } from "react-intl";
import { Modal } from "antd";
import { RefetchQueries } from "../type-aliases/RefetchQueries";

/**
 * Returns a callback that deletes an entity instance.
 * Can be used, for example, on a "Delete" button in an entity list component.
 * Shows a confirmation dialog and invokes delete mutation upon confirmation.
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
  const intl = useIntl();

  // TODO: handle loading and error (https://github.com/Amplicode/amplicode-frontend/issues/128)
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

  return () => {
    Modal.confirm({
      content: intl.formatMessage({
        id: "EntityListScreen.deleteConfirmation"
      }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: handleConfirm
    });
  };
}
