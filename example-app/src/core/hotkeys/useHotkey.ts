import hotkeys, { KeyHandler } from "hotkeys-js";
import { HotkeyConfig, useHotkeyStore } from "@amplicode/react-core";
import { useEffect } from "react";
import { useBreadcrumb } from "../screen/BreadcrumbContext";
import { ScreenHotkeyConfig } from "./ScreenHotkeyConfig";

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
  screenHotkeyConfig: ScreenHotkeyConfig,
  memoizedCallback: KeyHandler,
) => {
  const {addHotkeyConfig, removeHotkeyConfigs} = useHotkeyStore();
  const {breadcrumbItems} = useBreadcrumb();
  const currentBreadcrumb = breadcrumbItems?.length > 0 ? breadcrumbItems[breadcrumbItems.length - 1] : undefined;

  useEffect(() => {
    const {screenId, ...hotkeyConfig} = screenHotkeyConfig;

    if (screenId === currentBreadcrumb?.screenId) {
      hotkeys(hotkeyConfig.hotkey, memoizedCallback);
      addHotkeyConfig(hotkeyConfig);
    }

    return () => {
      if (screenId === currentBreadcrumb?.screenId) {
        hotkeys.unbind(hotkeyConfig.hotkey, memoizedCallback);
        removeHotkeyConfigs(hotkeyConfig);
      }
    };
  }, [addHotkeyConfig, currentBreadcrumb?.screenId, memoizedCallback, removeHotkeyConfigs, screenHotkeyConfig]);
}