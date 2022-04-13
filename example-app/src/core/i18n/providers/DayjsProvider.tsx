import { useI18nStore } from "@amplicode/react-core";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { useEffect } from "react";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(LocalizedFormat);

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
