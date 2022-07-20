import {Result} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {FormattedMessage, useIntl} from "react-intl";

export function AuthRedirect() {
  return (
    <Result icon={<LoadingOutlined/>}
            title={<FormattedMessage id='auth.redirectAfterLogin'/>}
    />
  );
}