import { makeObservable, action, observable, computed } from "mobx";

type CommonItemProps = {
  caption: string;
  key: string;
};

export type AddonMenuItem<MenuItemProps = unknown> = {
  type: "MenuItem",
  menuItemProps: MenuItemProps & CommonItemProps,
}

export type AddonSubMenuItem<MenuItemProps = unknown ,SubMenuItemProp = unknown> = {
  type: "SubMenuItem",
  subMenuItemProps: SubMenuItemProp & CommonItemProps,
  childItems: Array<AddonMenuItem<MenuItemProps> | AddonSubMenuItem<SubMenuItemProp>>
}

export type AddonItem<MenuItemProps = unknown ,SubMenuItemProp = unknown> =
    AddonMenuItem<MenuItemProps> 
  | AddonSubMenuItem<MenuItemProps, SubMenuItemProp>;

class MenuStore {
  private readonly _addonItems: AddonItem[];

  constructor() {
    this._addonItems = [];
    makeObservable<MenuStore, '_addonItems'>(this, {
      _addonItems: observable,
      addAddonItem: action,
      addonMenuItems: computed
    });
  }

  addAddonItem<MenuItemProps = unknown ,SubMenuItemProp = unknown>(
    itemInfo: AddonItem<MenuItemProps, SubMenuItemProp>
  ) {
    this._addonItems.push(itemInfo);
  }

  get addonMenuItems(): AddonItem[] {
    return this._addonItems;
  }
}

export const menuStore = new MenuStore();
