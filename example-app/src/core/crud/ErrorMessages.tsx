import { Alert } from "antd";
import React from "react";

/**
 * Displays a set of `errorMessages` if defined, otherwise does not render.
 *
 * @param errorMessages
 */
export function ErrorMessages({ errorMessages }: { errorMessages?: string[] }) {
  if (
    errorMessages == null ||
    errorMessages.length == null ||
    errorMessages.length === 0
  ) {
    return null;
  }

  return (
    <>
      {errorMessages.map(errorMessage => (
        <Alert
          description={errorMessage}
          type="error"
          className="form-error-message"
          showIcon
        />
      ))}
    </>
  );
}
