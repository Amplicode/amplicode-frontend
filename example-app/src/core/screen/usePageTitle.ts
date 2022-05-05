import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "./BreadcrumbContext";

const defaultPageTitle = "Jmix2 Petclinic";

export function usePageTitle(pageTitle: string) {
  const { breadcrumbItems } = useContext(BreadcrumbContext);

  useEffect(() => {
    document.title = pageTitle;
    return () => {
      document.title = defaultPageTitle;
    };
  }, [breadcrumbItems, pageTitle]);
}
