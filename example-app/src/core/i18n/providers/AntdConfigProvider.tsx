import { useI18nStore } from "@amplicode/react-core";
import { ConfigProvider } from "antd";
import { observer } from "mobx-react";
import { convertMessagesToAntdLocale } from "../util/convertMessagesToAntdLocale";

export interface AntdConfigProviderProps {
  children: React.ReactNode;
}
export const AntdConfigProvider = observer(
  ({ children }: AntdConfigProviderProps) => {
    const { currentMessages, currentLocale } = useI18nStore();

    return (
      <ConfigProvider
        locale={convertMessagesToAntdLocale(currentLocale, currentMessages)}
      >
        {children}
      </ConfigProvider>
    );
  }
);
