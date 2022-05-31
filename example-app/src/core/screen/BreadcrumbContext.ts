import React, { Dispatch, SetStateAction, useContext } from "react";

export interface BreadcrumbItem {
  screenId?: string;
  caption: string;
}

interface BreadcrumbContextType {
  breadcrumbItems: BreadcrumbItem[];
  setBreadcrumbItems: Dispatch<SetStateAction<BreadcrumbItem[]>>;
}

export const BreadcrumbContext = React.createContext<BreadcrumbContextType>({
  breadcrumbItems: [],
  setBreadcrumbItems: () => {},
});

export const useBreadcrumb = () => useContext(BreadcrumbContext);
