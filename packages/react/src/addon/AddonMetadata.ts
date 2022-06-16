import React from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";

export interface InsertedElementMetadata {
  element: React.ReactElement;
  filePath: string;
  below?: string | string[];
  above?: string | string[];
}

export interface AddonMetadata {
  insertedElements?: InsertedElementMetadata[];
  menuItems?: ItemType[];
  routes?: React.ReactNode[];
}
