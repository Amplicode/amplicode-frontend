import "./Header.css";
import { observer } from "mobx-react";
import { LocaleSelector } from "../../core/i18n/localeSelector/LocaleSelector";
import Logo from "./amplicode-logo.svg";
import { UserPanel } from "../../core/security/UserPanel";

export const AppHeader = observer(() => {
  return (
    <div className="app-header">
      <div className="app-header__app-logo">
        <img src={Logo} alt="Amplicode" />
      </div>
      <div className="app-header__controls">
        <LocaleSelector />
        <UserPanel />
      </div>
    </div>
  );
});
