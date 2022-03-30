import { unflatten } from '@amplicode/react-core';
import { Locale } from 'antd/es/locale-provider';
import { ANTD_MESSAGE_PREFIX } from './convertAntdLocaleToMessages';

export function convertMessagesToAntdLocale(locale: string, messages: Record<string, string>): Locale {
  const antdMessages = Object.entries(messages)
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key.replace(ANTD_MESSAGE_PREFIX, '')] = value;
      return acc;
    }, {});

  return {
    locale,
    ...unflatten(antdMessages)
  };
}