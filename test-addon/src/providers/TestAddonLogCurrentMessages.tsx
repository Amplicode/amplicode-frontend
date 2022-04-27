import {useEffect} from "react";
import {useI18nStore} from '@amplicode/react-core';
import {observer} from 'mobx-react'

interface TestAddonProviderProps {
  logMessagePreset?: string;
  children?: React.ReactNode;
}
export const TestAddonLogCurrentMessages = observer(({
  logMessagePreset = "Current messages:",
  children,
}: TestAddonProviderProps) => {
  const {currentMessages} = useI18nStore();

  useEffect(() => {
    console.log(logMessagePreset, currentMessages);
  }, [logMessagePreset, currentMessages]);
  
  return <>{children}</>;
});
