import {useIntl} from "react-intl";
import {useCallback} from "react";
import {message} from "antd";

/**
 * Returns a callback that is executed when client-side validation of a form has failed
 */
export function useClientValidationFailed() {
  const intl = useIntl();

  return useCallback(() => {
    return message.error(
      intl.formatMessage({ id: "EntityDetailsScreen.validationError" })
    );
  }, [intl]);
}