import { useI18nStore } from "@amplicode/react";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(LocalizedFormat);
dayjs.extend(CustomParseFormat);

export interface DayjsProviderProps {
  children: React.ReactNode;
}
export const DayjsProvider = observer(({ children }: DayjsProviderProps) => {
  const { currentLocale } = useI18nStore();

  dayjs.locale(currentLocale);

  return <>{children}</>;
});
