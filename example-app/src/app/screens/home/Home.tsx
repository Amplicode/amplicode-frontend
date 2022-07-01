import { gql, useQuery } from "@apollo/client";
import { Result, Spin } from "antd";
import "./Home.css";
import { FormattedMessage } from "react-intl";
import { SmileOutlined } from "@ant-design/icons";
import {useAppSelector} from "../../../core/store/store";
import {selectUserName} from "../../../core/security/securitySlice";

export const Home = () => {
  const username = useAppSelector(selectUserName);

  return (
    <Result
      icon={<SmileOutlined />}
      title={
        <FormattedMessage
          id="home.welcome"
          values={{ appName: "Jmix2 Petclinic" }}
        />
      }
      subTitle={<FormattedMessage id="home.loggedInAs" values={{ username }} />}
    />
  );
};
