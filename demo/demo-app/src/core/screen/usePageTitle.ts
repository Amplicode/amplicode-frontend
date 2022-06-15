import { useEffect } from "react";

const defaultPageTitle = "Jmix2 Petclinic";

export function usePageTitle(pageTitle: string) {
  useEffect(() => {
    document.title = pageTitle;
    return () => {
      document.title = defaultPageTitle;
    };
  }, [pageTitle]);
}
