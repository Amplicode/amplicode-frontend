import React from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";

export interface MountedComponentMetadata {
  element: React.ReactElement;
  filePath: string;
  below?: string | string[];
  above?: string | string[];
}

export interface AddonMetadata {
  mountedComponents?: MountedComponentMetadata[];
  menuItems?: ItemType[];
  routes?: React.ReactNode[];
}
