import { useMemo } from "react";
import { useScreenHotkey } from "../useHotkey";
import { HotkeyConfig } from "@amplicode/react-core";
import { ScreenHotkeyConfig } from "../ScreenHotkeyConfig";

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
  screenId: string;
  openCreateEditor: () => void;
}
export const useDefaultBrowserHotkeys = ({
  screenId,
  openCreateEditor
}: BrowserHotkeysHook) => {;
  const openCreateEditorScreenHotkeyConfig = useMemo<ScreenHotkeyConfig>(() => ({screenId, ...createEntityHotkeyConfig}), [screenId]);
  useScreenHotkey(openCreateEditorScreenHotkeyConfig, openCreateEditor);
}