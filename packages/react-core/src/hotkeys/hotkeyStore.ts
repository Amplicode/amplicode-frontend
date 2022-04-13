import { action, computed, makeObservable, observable } from "mobx"
import { HotkeyConfig } from "./hotkeyConfig";

export class HotkeyStore {
  // initialized with creating store
  defaultHotkeyConfigs: HotkeyConfig[] = [];

  // currently registered hotkeyConfigs in runtime
  dynamicHotkeyConfigs: HotkeyConfig[] = [];

  // merged version of defaultHotkeyConfigs and dynamicHotkeyConfigs
  get hotkeyConfigs() {
    const onlyInDynamicHotkeyConfigs = this.dynamicHotkeyConfigs.filter(
      dynamicHotkeyConfig => !this.defaultHotkeyConfigs.some(
        defaultHotkeyConfig => equalsHotkeyConfig(defaultHotkeyConfig, dynamicHotkeyConfig)
      )
    );
    const redefinedDefaultHotkeyConfigs = this.defaultHotkeyConfigs
      .map(defaultHotkeyConfig =>
        this.dynamicHotkeyConfigs.find(
          dynamicHotkeyConfig => equalsHotkeyConfig(defaultHotkeyConfig, dynamicHotkeyConfig)
        ) || defaultHotkeyConfig
      )
    const hotkeyConfigs = [...redefinedDefaultHotkeyConfigs, ...onlyInDynamicHotkeyConfigs]
    return hotkeyConfigs;
  }

  constructor(defaultHotkeyConfigs: HotkeyConfig[]) {
    makeObservable<HotkeyStore>(this, {
      dynamicHotkeyConfigs: observable,
      addHotkeyConfig: action,
      removeHotkeyConfigs: action,
      hotkeyConfigs: computed,
    });
    this.defaultHotkeyConfigs = defaultHotkeyConfigs;
  }

  addHotkeyConfig = (hotkeyConfig: HotkeyConfig) => {
    this.dynamicHotkeyConfigs.push(hotkeyConfig);
  }

  removeHotkeyConfigs = (hotkeyConfig: HotkeyConfig) => {
    const filteredDynamicHotkeyConfigs = this.dynamicHotkeyConfigs.filter(
      hotkeyConfigItem => !equalsHotkeyConfig(hotkeyConfig, hotkeyConfigItem)
    );
    this.dynamicHotkeyConfigs = filteredDynamicHotkeyConfigs;
  }
}

export function equalsHotkeyConfig(hotkeyConfigOne: HotkeyConfig, hotkeyConfigTwo: HotkeyConfig) {
  return hotkeyConfigOne.description === hotkeyConfigTwo.description
}
