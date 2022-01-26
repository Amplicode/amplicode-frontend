import {
  HotkeyConfig,
  screenHotkeysConfigs,
  browserHotkeysConfigs,
  editorHotkeysConfigs
} from "@amplicode/react-core";
import { hotkeyInfoHotkeyConfigs } from "./hotkey-info-config";

export const defaultHotkeyConfigs: HotkeyConfig[] = [
  ...hotkeyInfoHotkeyConfigs,
  ...screenHotkeysConfigs,
  ...editorHotkeysConfigs,
  ...browserHotkeysConfigs
];
