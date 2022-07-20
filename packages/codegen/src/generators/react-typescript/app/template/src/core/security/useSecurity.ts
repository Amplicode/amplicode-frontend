import {useContext} from "react";
import { SecurityStore } from "./SecurityStore";
import { SecurityContext } from "./SecurityContext";

export function useSecurity(): SecurityStore {
  const securityStore = useContext(SecurityContext);
  if (securityStore == null) {
    throw new Error('Security store is not initialized');
  }
  return securityStore;
}
