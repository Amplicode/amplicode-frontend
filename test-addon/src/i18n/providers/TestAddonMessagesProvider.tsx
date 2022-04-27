import {useI18nStore} from '@amplicode/react-core';
import { useEffect } from 'react';
import enMessages from '../messages/en.json';
import ruMessages from '../messages/ru.json';

interface TestAddonMessagesProviderProps {
  children?: React.ReactNode;
}
export const TestAddonMessagesProvider = ({children}: TestAddonMessagesProviderProps) => {
  const {mergeMessages} = useI18nStore();

  useEffect(() => {
    mergeMessages('en', enMessages);
    mergeMessages('ru', ruMessages);
  }, [mergeMessages]);

  return (
    <>
      {children}
    </>
  );
}