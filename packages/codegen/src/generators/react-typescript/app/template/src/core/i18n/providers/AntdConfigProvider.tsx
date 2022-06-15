import { useI18nStore } from "@amplicode/react";
import { ConfigProvider } from "antd";
import { Locale } from "antd/es/locale-provider";
import { observer } from "mobx-react";

export interface AntdConfigProviderProps {
  children: React.ReactNode;
}
export const AntdConfigProvider = observer(
  ({ children }: AntdConfigProviderProps) => {
    const { localeConfigs, currentLocale } = useI18nStore();
    const currentLocaleConfig = localeConfigs[currentLocale];

    return (
      <ConfigProvider
        locale={currentLocaleConfig.antdLocale as Locale}
        direction={currentLocaleConfig.direction}
      >
        {children}
      </ConfigProvider>
    );
  }
);
