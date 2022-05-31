import { HotkeyConfig } from "@amplicode/react-core";
import { useScreenHotkey } from "../useHotkey";

const EDITOR_HOTKEYS_CATEGORY_NAME = 'hotkeys.category.editor';

export const saveEntityHotkeysConfig: HotkeyConfig = {
  hotkey: 's',
  description: 'hotkeys.editor.saveEntity',
  categoryName: EDITOR_HOTKEYS_CATEGORY_NAME,
}

export const editorHotkeysConfigs: HotkeyConfig[] = [
  saveEntityHotkeysConfig,
];

interface EditorHotkeysHook {
  screenId: string;
  saveEntity: () => void;
}
export const useDefaultEditorHotkeys = ({
  screenId,
  saveEntity
}: EditorHotkeysHook) => {
  useScreenHotkey({screenId, ...saveEntityHotkeysConfig}, saveEntity);
}