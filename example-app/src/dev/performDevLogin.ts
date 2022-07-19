// import {DEV_LOGIN, DEV_PASSWORD} from "../config";
import {SecurityStore} from "../core/security/SecurityStore";
import {Dispatch, SetStateAction} from "react";

// form login
// export async function performDevLogin(
//   security: SecurityStore,
//   setLoading: Dispatch<SetStateAction<boolean>>,
//   setError: Dispatch<SetStateAction<boolean>>,
// ) {
//   const response = await security.login(DEV_LOGIN, DEV_PASSWORD);
//   if (response?.status !== 200) {
//     setError(true);
//   }
//   setLoading(false);
// }

export async function performDevLogin(
  security: SecurityStore,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>,
) {
  // dev login is not supported for chosen authentication method
}