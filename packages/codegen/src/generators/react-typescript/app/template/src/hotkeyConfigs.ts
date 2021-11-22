import {
  HotkeyConfig,
  screenHotkeysConfigs,
  browserHotkeysConfigs,
  editorHotkeysConfigs
} from "@amplicode/react-core";
import { hotkeyInfoHotkeyConfigs } from "./app/app-header/hotkeyInfoHotkeyConfigs";

export const defaultHotkeyConfigs: HotkeyConfig[] = [
  ...hotkeyInfoHotkeyConfigs,
  ...screenHotkeysConfigs,
  ...editorHotkeysConfigs,
  ...browserHotkeysConfigs,
];
