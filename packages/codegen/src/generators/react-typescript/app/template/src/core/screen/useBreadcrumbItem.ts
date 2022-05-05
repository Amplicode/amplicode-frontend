import {useContext, useEffect} from "react";
import {BreadcrumbContext} from "./BreadcrumbContext";

export function useBreadcrumbItem(newItem: string) {
   const {breadcrumbItems, setBreadcrumbItems} = useContext(BreadcrumbContext);

   useEffect(() => {
     breadcrumbItems.push(newItem);
     setBreadcrumbItems([...breadcrumbItems]);

     return () => {
       breadcrumbItems.pop();
       setBreadcrumbItems([...breadcrumbItems]);
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
}