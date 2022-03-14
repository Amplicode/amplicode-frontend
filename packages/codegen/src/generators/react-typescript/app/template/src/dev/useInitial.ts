import {useEffect, useState} from "react";
import { InitialHookStatus } from "@react-buddy/ide-toolbox";
import { securityStore } from "../core/security/security-store";
import {DEV_LOGIN, DEV_PASSWORD} from "../config";

export const useInitial: () => InitialHookStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    async function login() {
      await securityStore.login(DEV_LOGIN, DEV_PASSWORD, status =>  {
        if (status !== 200) {
          setError(true);
        }
        setLoading(false);
      });
    }

    login();
  }, []);

  /*
    Implement hook functionality here.
    If you need to execute async operation, set loading to true and when it's over, set loading to false.
    If you cathched some errors, set error status to true.
    Initial hook is considered to be successfully completed if it will return {loading: false, error: false}.
  */

  return {loading, error};
};