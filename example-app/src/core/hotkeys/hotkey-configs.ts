import {
  HotkeyConfig,
  screenHotkeysConfigs,
  browserHotkeysConfigs,
  editorHotkeysConfigs
} from "@amplicode/react-core";
import { hotkeyInfoHotkeyConfigs } from "../../app/header/hotkey-info-hotkey-configs";

export const defaultHotkeyConfigs: HotkeyConfig[] = [
  ...hotkeyInfoHotkeyConfigs,
  ...screenHotkeysConfigs,
  ...editorHotkeysConfigs,
  ...browserHotkeysConfigs
];
