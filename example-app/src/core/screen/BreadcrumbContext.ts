import React, { Dispatch, SetStateAction } from "react";

export const BreadcrumbContext = React.createContext<
  Dispatch<SetStateAction<string[]>>
>(() => {});
