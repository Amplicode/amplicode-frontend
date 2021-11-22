import { useCallback } from "react";
import { useScreenHotkey } from "../useHotkey";
import { HotkeyConfig } from "../hotkeyConfig";
import { KeyHandler } from "hotkeys-js";

const BROWSER_HOTKEYS_CATEGORY_NAME = 'hotkeys.category.browser';

export const createEntityHotkeyConfig: HotkeyConfig = {
  hotkey: 'g+c',
  description: 'hotkeys.browser.createEntity',
  categoryName: BROWSER_HOTKEYS_CATEGORY_NAME,
}

export const browserHotkeysConfigs: HotkeyConfig[] = [
  createEntityHotkeyConfig,
];

export interface BrowserHotkeysHook {
  openEditor: () => void;
}
export const useDefaultBrowserHotkeys = ({openEditor}: BrowserHotkeysHook) => {
  const createEntity = useCallback<KeyHandler>(() => openEditor(), [openEditor]);
  useScreenHotkey(createEntityHotkeyConfig, createEntity);
}