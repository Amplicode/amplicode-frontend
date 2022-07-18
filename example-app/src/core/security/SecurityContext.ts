import {createContext} from "react";
import {SecurityStore} from "./SecurityStore";

// TODO: default value
export const SecurityContext = createContext<SecurityStore | undefined>(undefined);