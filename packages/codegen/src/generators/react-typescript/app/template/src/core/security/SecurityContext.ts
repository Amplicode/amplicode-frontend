import {createContext} from "react";
import {SecurityStore} from "./SecurityStore";

export const SecurityContext = createContext<SecurityStore | undefined>(undefined);