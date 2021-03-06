import { gql, useQuery } from "@apollo/client";
import { Result, Spin } from "antd";
import "./Home.css";
import { FormattedMessage } from "react-intl";
import { SmileOutlined } from "@ant-design/icons";

const QUERY = gql`
  query {
    userInfo {
      username
    }
  }
`;

export const Home = () => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) {
    return <Spin />;
  }

  if (error != null) {
    return (
      <Result status="error" title="Query failed" subTitle={error.message} />
    );
  }

  const { username } = data?.userInfo;

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
