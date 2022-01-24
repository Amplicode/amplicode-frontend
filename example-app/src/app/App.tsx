import React from "react";
import "./App.css";
import { Login } from "./login/Login";
import { observer } from "mobx-react";
import { AppMain } from "./main/Main";
import { useDefaultScreenHotkeys } from "@amplicode/react-core";
import { securityStore } from "../core/security/security-store";

export const App = observer(() => {
  useDefaultScreenHotkeys();

  if (!securityStore.isLoggedIn) {
    return <Login />;
  }

  return <AppMain />;
});

export default App;
