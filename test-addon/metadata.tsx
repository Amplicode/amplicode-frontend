import {TestAddonScreen1} from './src/screens/TestAddonScreen1';
import {TestAddonScreen2} from './src/screens/TestAddonScreen2';
import {TestAddonLogCurrentMessages} from './src/providers/TestAddonLogCurrentMessages';
import {TestAddonMessagesProvider} from './src/i18n/providers/TestAddonMessagesProvider';
import {AddonMetadata} from '@amplicode/react-core';

export default {
  mountedComponents: [
    {
      name: <TestAddonLogCurrentMessages logMessagePreset="Current messages:" />,
      mountingPoint: 'ROOT',
      below: 'I18nProvider'
    },
    {
      name: <TestAddonMessagesProvider />,
      mountingPoint: 'I18N',
      below: 'I18nStoreProvider',
      above: 'StaticI18nMessagesProvider',
    }
  ],
  menuItems: [
    { key: 'test-addon-screen-1' }
  ],
  screenItems: [
    {
      key: 'test-addon-screen-1',
      captionKey: "screen.TestAddonScreen1",
      component: <TestAddonScreen1 />,
    },
    {
      key: 'test-addon-screen-2',
      captionKey: "screen.TestAddonScreen2",
      component: <TestAddonScreen2 />,
    },
  ],
} as AddonMetadata;
