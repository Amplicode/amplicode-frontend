import {useHistory} from "react-router-dom";
import {useScreens} from "@amplicode/react-core";
import {useCallback} from "react";

/**
 * Returns a callback that closes the entity editor, returns the user to parent screen
 * and modifies the current url accordingly.
 */
export function useCloseEditor() {
  const history = useHistory();
  const screens = useScreens();

  return useCallback(() => {
    history.push("."); // Remove entity id part from url
    screens.closeActiveBreadcrumb();
  }, [screens, history]);
}