import React, {
  useEffect,
  useMemo
} from "react";
import "./Login.css";
import { LOGIN_URI } from "../../config";

export const Login = () => {
  const redirectUrl = useMemo(
    () => `${LOGIN_URI}?redirect_uri=${window.location.href}`,
    []
  );

  useEffect(() => {
    window.location.href = redirectUrl;
  }, [redirectUrl]);

  return null;
};
