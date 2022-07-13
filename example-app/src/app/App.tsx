import React from "react";
import "./App.css";
import { Login } from "../core/security/login/Login";
import { observer } from "mobx-react";
import { AppMain } from "./main/Main";
import { useSecurityStore } from "../core/security/security-context";
import { Auth } from "../core/security/Auth";

export const App = observer(() => {
  return (
    <Auth>
      <AppMain/>
    </Auth>
  )
});

export default App;
