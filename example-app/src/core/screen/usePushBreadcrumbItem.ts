import { useContext, useEffect } from "react";
import { BreadcrumbItem, BreadcrumbContext } from "./BreadcrumbContext";

export function usePushBreadcrumbItem(newBreadcrumbItem: BreadcrumbItem) {
  const {setBreadcrumbItems} = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbItems(breadcrumbItems => [...breadcrumbItems, newBreadcrumbItem]);

    return () => {
      setBreadcrumbItems(breadcrumbItems => breadcrumbItems.slice(0, -1));
    };
  }, [newBreadcrumbItem, setBreadcrumbItems]);
}
