import {useCloseEditor} from "./useCloseEditor";
import {Button, Form, Space} from "antd";
import {FormattedMessage} from "react-intl";
import React from "react";

/**
 * Standard form buttons (Cancel & Submit).
 *
 * @param submitting flag indicating whether submit is in progress
 * @constructor
 */
export function FormButtons({submitting}: {submitting?: boolean}) {
  const closeEditor = useCloseEditor();

  return (
    <Form.Item style={{textAlign: 'center'}}>
      <Space>
        <Button htmlType="button" onClick={closeEditor}>
          <FormattedMessage id="common.cancel" />
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
        >
          <FormattedMessage id={"common.submit"} />
        </Button>
      </Space>
    </Form.Item>
  );
}
