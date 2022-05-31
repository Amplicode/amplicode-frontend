import {
  HotkeyConfig,
  // screenHotkeysConfigs,
  browserHotkeysConfigs,
  editorHotkeysConfigs
} from "@amplicode/react-core";
import { hotkeyInfoHotkeyConfigs } from "./hotkey-info-config";
import { ScreenHotkeyConfig } from "./ScreenHotkeyConfig";

export const defaultHotkeyConfigs: (HotkeyConfig | ScreenHotkeyConfig)[] = [
  ...hotkeyInfoHotkeyConfigs,
  // ...screenHotkeysConfigs,
  ...editorHotkeysConfigs,
  ...browserHotkeysConfigs
];
