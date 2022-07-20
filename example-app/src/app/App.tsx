import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { AppMain } from "./main/Main";
import { Auth } from "../core/security/Auth";

export const App = observer(() => {
  return (
    <Auth>
      <AppMain/>
    </Auth>
  )
});
