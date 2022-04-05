import { useI18nStore } from "@amplicode/react-core";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { useEffect } from "react";

export interface DayjsProviderProps {
  children: React.ReactNode;
}
export const DayjsProvider = observer(({ children }: DayjsProviderProps) => {
  const { currentLocale } = useI18nStore();

  useEffect(() => {
    import(
      `../../../../node_modules/dayjs/esm/locale/${currentLocale}.js`
    ).then(({ default: locale }) => dayjs.locale(locale));
  }, [currentLocale]);

  return <>{children}</>;
});
