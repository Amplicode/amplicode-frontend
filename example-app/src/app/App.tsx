import React from "react";
import "./App.css";
import { Login } from "./login/Login";
import { observer } from "mobx-react";
import { AppMain } from "./main/Main";
import { useDefaultScreenHotkeys } from "@amplicode/react-core";
import { useSecurityStore } from "../core/security/security-context";

export const App = observer(() => {
  const securityStore = useSecurityStore();

  useDefaultScreenHotkeys();
  securityStore.initialize();

  if (!securityStore.isLoggedIn) {
    return <Login />;
  }

  return <AppMain />;
});

export default App;
