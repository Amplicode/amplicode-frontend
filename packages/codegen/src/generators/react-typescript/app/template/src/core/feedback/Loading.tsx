import {Result} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export function Loading() {
  return (
    <Result icon={<LoadingOutlined/>}/>
  );
}