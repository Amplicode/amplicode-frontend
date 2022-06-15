import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "./BreadcrumbContext";

export function useBreadcrumbItem(newItem: string) {
  const setBreadcrumbItems = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbItems(breadcrumbItems => [...breadcrumbItems, newItem]);

    return () => {
      setBreadcrumbItems(breadcrumbItems => breadcrumbItems.slice(0, -1));
    };
  }, [newItem, setBreadcrumbItems]);
}
