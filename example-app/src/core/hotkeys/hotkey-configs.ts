import { HotkeyConfig } from "@amplicode/react-core";
import { browserHotkeysConfigs } from "./defaultHotkeys/browser";
import { editorHotkeysConfigs } from "./defaultHotkeys/editor";
import { hotkeyInfoHotkeyConfigs } from "./hotkey-info-config";

export const defaultHotkeyConfigs: HotkeyConfig[] = [
  ...hotkeyInfoHotkeyConfigs,
  ...editorHotkeysConfigs,
  ...browserHotkeysConfigs
];
