import {TestAddonScreen1} from './src/screens/TestAddonScreen1';
import {TestAddonScreen2} from './src/screens/TestAddonScreen2';
import {TestAddonLogCurrentMessages} from './src/providers/TestAddonLogCurrentMessages';
import {TestAddonMessagesProvider} from './src/i18n/providers/TestAddonMessagesProvider';
import {AddonMetadata} from '@amplicode/react-core';
import {Route} from 'react-router-dom';

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
    {
      key: 'test-addon-screen-1-path',
      captionKey: "screen.TestAddonScreen1",
      path: 'test-addon-screen-1-path',
    }
  ],
  routes: [
    <Route path='test-addon-screen-1-path' element={<TestAddonScreen1 />} />,
    <Route path='test-addon-screen-2-path' element={<TestAddonScreen2 />} />,
  ],
} as AddonMetadata;
