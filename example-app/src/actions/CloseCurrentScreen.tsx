import React from "react";
import { useScreens } from "@amplicode/react-core";

interface Props {
  screenKey: string
}

export const CloseCurrentScreen: React.FC<Props> = ({screenKey}) => {
  const screens = useScreens();
  screens.closeTab(screenKey);

  return null;
}
