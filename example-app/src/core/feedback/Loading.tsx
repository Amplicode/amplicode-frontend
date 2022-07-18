import {FormattedMessage} from "react-intl";
import {Result} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export function Loading() {
  return (
    <Result title={<FormattedMessage id='auth.loading' />}
            icon={<LoadingOutlined/>}
    />
  );
}