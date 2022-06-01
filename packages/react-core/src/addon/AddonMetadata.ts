import React from "react";

export interface MountedComponentMetadata {
  name: React.ReactElement;
  mountingPoint: 'ROOT' | 'I18N';
  below?: string | string[];
  above?: string | string[];
}

export interface RouteMenuItemMetadata {
  captionKey: string;
  key: string;
  path: string;
}
export interface SubMenuMetadata {
  captionKey: string;
  key: string;
  children: MenuItemMetadata[];
}
export type MenuItemMetadata = RouteMenuItemMetadata | SubMenuMetadata;

export interface AddonMetadata {
  mountedComponents?: MountedComponentMetadata[];
  menuItems?: MenuItemMetadata[];
  routes?: React.ReactNode[];
}
