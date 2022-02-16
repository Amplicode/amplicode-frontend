import {useCallback} from "react";
import {useScreens} from "@amplicode/react-core";

/**
 * Invokes `onSelect` on `item` and closes the current screen.
 * Used in lookup screens.
 *
 * @param item
 * @param onSelect
 */
export function useSelectItem<TItem extends Record<string, unknown>>(
  item?: TItem | null,
  onSelect?: (item: TItem) => void
) {
  const screens = useScreens();

  return useCallback(() => {
    if (onSelect == null || item == null) {
      return;
    }

    onSelect(item);
    screens.closeActiveBreadcrumb();
  }, [onSelect, item, screens]);
}