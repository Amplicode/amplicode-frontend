import React from "react";
import { useScreens, ReactComponent } from "@amplicode/react-core";

interface Props {
  screenComponent: ReactComponent,
  screenCaption: string,
  screenKey: string
}

export const OpenScreen: React.FC<Props> = ({
  screenComponent, 
  screenCaption, 
  screenKey
}) => {
  const screens = useScreens();
  screens.openInTab({
    breadcrumbCaption: screenCaption,
    tabCaption: screenCaption,
    component: screenComponent,
    tabKey: screenKey
  });

  return null;
}
