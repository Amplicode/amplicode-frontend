import { Result } from "antd";
import "./Home.css";
import { FormattedMessage } from "react-intl";
import { SmileOutlined } from "@ant-design/icons";
import {useSecurity} from "../../../core/security/useSecurity";

export const Home = () => {
  const {userName} = useSecurity();

  return (
    <Result
      icon={<SmileOutlined />}
      title={
        <FormattedMessage
          id="home.welcome"
          values={{ appName: "Jmix2 Petclinic" }}
        />
      }
      subTitle={<FormattedMessage id="home.loggedInAs" values={{ userName }} />}
    />
  );
};
