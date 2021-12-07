import { observer } from "mobx-react";
import React, {useContext, useEffect} from "react";
import { useScreens } from "./ScreenContext";
import { TabState, BreadcrumbState } from "./Screens";

export interface ScreenMeta {
  tab: TabState;
  breadcrumb: BreadcrumbState;
}

export const ScreenMetaContext = React.createContext<ScreenMeta | undefined>(undefined);

export interface ScreenMetaProviderProps extends ScreenMeta {
  children: React.ReactNode;
}
export const ScreenMetaProvider = observer(({children, ...screenMeta}: ScreenMetaProviderProps) => {
  const screens = useScreens();

  useEffect(() => {
    if (
      screenMeta != null
      && screens.activeTab?.key === screenMeta.tab.key
      && screens.activeBreadcrumb?.key === screenMeta.breadcrumb.key
    ) {
      screens.emitter.emit('switchScreen', screenMeta);
    }
  }, [screenMeta, screens.activeBreadcrumb?.key, screens.activeTab?.key, screens.emitter]);

  return (
    <ScreenMetaContext.Provider value={screenMeta}>
      {children}
    </ScreenMetaContext.Provider>
  )
});

export const useScreenMeta = () => useContext(ScreenMetaContext);
