import { Result } from "antd";
import { FormattedMessage } from "react-intl";
import React from "react";

/**
 * Default error message for a failed request
 */
export function RequestFailedError() {
  return (
    <Result
      status="error"
      title={<FormattedMessage id="common.requestFailed" />}
    />
  );
}
