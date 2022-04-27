export interface MountedComponentMetadata {
  name: React.ReactElement;
  mountingPoint: 'ROOT' | 'I18N';
  below?: string | string[];
  above?: string | string[];
}

export interface MenuItemMetadata {
  captionKey: string;
  key: string;
  screenId?: string;
}

export interface ScreenItemMetadata {
  key: string;
  captionKey: string;
  component: React.ReactElement;
}

export interface AddonMetadata {
  mountedComponents: MountedComponentMetadata[];
  menuItems: MenuItemMetadata[];
  screenItems: ScreenItemMetadata[];
}
