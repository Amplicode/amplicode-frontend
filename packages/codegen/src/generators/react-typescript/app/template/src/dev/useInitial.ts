import { useEffect, useState } from "react";
import { InitialHookStatus } from "@react-buddy/ide-toolbox";
import { useSecurity } from "../core/security/useSecurity";
import {performDevLogin} from "./performDevLogin";

export const useInitial: () => InitialHookStatus = () => {
  const security = useSecurity();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    void performDevLogin(security, setLoading, setError);
  }, [security]);

  /*
    Implement hook functionality here.
    If you need to execute async operation, set loading to true and when it's over, set loading to false.
    If you catch some errors, set error status to true.
    Initial hook is considered to be successfully completed if it will return {loading: false, error: false}.
  */

  return { loading, error };
};
