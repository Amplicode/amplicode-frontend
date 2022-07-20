import {DEV_LOGIN, DEV_PASSWORD} from "../config";
import {SecurityStore} from "../core/security/SecurityStore";
import {Dispatch, SetStateAction} from "react";

export async function performDevLogin(
  security: SecurityStore,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>,
) {
  const response = await security.login(DEV_LOGIN, DEV_PASSWORD);
  if (response?.status !== 200) {
    setError(true);
  }
  setLoading(false);
}