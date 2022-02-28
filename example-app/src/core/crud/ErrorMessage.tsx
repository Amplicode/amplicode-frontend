import { Alert } from "antd";
import React from "react";

/**
 * Displays `errorMessage` if defined, otherwise does not render.
 *
 * @param errorMessage
 */
export function ErrorMessage({ errorMessage }: { errorMessage?: string }) {
  if (errorMessage == null) {
    return null;
  }

  return <Alert message={errorMessage} type="error" />;
}
