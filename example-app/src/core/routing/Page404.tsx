import { Button, Result } from "antd";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export const Page404 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={<FormattedMessage id={"common.404"} />}
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          <FormattedMessage id={"common.back"} />
        </Button>
      }
    />
  );
};
