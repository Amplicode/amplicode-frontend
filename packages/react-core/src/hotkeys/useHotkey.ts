import hotkeys, { KeyHandler } from "hotkeys-js";
import { useEffect } from "react";
import { useHotkeyStore } from "./hotkeyContext";
import { useScreens } from "../screen-api/ScreenContext";
import { HotkeyConfig } from "./hotkeyConfig";
import { useScreenMeta } from "../screen-api/ScreenMetaContext";

export const useHotkey = (
  hotkeyConfig: HotkeyConfig,
  memoizedCallback: KeyHandler,
) => {
  const {addHotkeyConfig, removeHotkeyConfigs} = useHotkeyStore();

  useEffect(() => {
    addHotkeyConfig(hotkeyConfig);
    hotkeys(hotkeyConfig.hotkey, memoizedCallback);

    return () => {
      hotkeys.unbind(hotkeyConfig.hotkey, memoizedCallback);
      removeHotkeyConfigs(hotkeyConfig);
    };
  }, [
    hotkeyConfig,
    addHotkeyConfig,
    removeHotkeyConfigs,
    memoizedCallback,
  ]);
}

export const useScreenHotkey = (
  hotkeyConfig: HotkeyConfig,
  memoizedCallback: KeyHandler,
) => {
  const {addHotkeyConfig, removeHotkeyConfigs} = useHotkeyStore();
  const {activeTab, activeBreadcrumb} = useScreens();
  const screenMeta = useScreenMeta();
  
  useEffect(() => {
    if (
      screenMeta != null
      && activeTab?.key === screenMeta.tab.key
      && activeBreadcrumb?.key === screenMeta.breadcrumb.key
    ) {
      hotkeys(hotkeyConfig.hotkey, memoizedCallback);
      addHotkeyConfig(hotkeyConfig);
    }

    return () => {
      if (activeTab?.key === screenMeta?.tab.key && activeBreadcrumb?.key === screenMeta?.breadcrumb.key) {
        hotkeys.unbind(hotkeyConfig.hotkey, memoizedCallback);
        removeHotkeyConfigs(hotkeyConfig);
      }
    };
  }, [activeTab?.key, activeBreadcrumb?.key, hotkeyConfig, addHotkeyConfig, removeHotkeyConfigs, memoizedCallback, screenMeta, screenMeta?.tab.key, screenMeta?.breadcrumb.key]);
}
