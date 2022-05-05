import React from "react";

export interface BreadcrumbContextType {
  breadcrumbItems: string[];
  setBreadcrumbItems: (screenNames: this["breadcrumbItems"]) => void;
}

export const BreadcrumbContext = React.createContext<BreadcrumbContextType>({
  breadcrumbItems: [],
  setBreadcrumbItems: () => {}
});
