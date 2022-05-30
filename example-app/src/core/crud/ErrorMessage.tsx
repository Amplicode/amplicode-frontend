import { Alert } from "antd";
import React from "react";
import { useIntl } from "react-intl";

/**
 * Displays `errorMessage` if defined, otherwise does not render.
 *
 * @param errorMessage
 */
export function ErrorMessage({ errorMessage }: { errorMessage?: string }) {
  const intl = useIntl();

  if (errorMessage == null || errorMessage.length === 0) {
    return null;
  }

  return (
    <Alert
      message={intl.formatMessage({ id: "common.error" })}
      description={errorMessage}
      type="error"
      className="form-error-message"
      showIcon
    />
  );
}
