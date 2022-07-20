import {SecurityStore} from "../core/security/SecurityStore";
import {Dispatch, SetStateAction} from "react";

export async function performDevLogin(
  security: SecurityStore,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>,
) {
  // dev login is not supported for chosen authentication method
}