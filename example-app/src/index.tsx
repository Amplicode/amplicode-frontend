import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import "antd/dist/antd.min.css";
import { BrowserRouter } from "react-router-dom";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { I18nProvider } from "./core/i18n/providers/I18nProvider";
import { ServerErrorInterceptor } from "./core/error/ServerErrorInterceptor";
import { AppErrorBoundary } from "./core/error/ErrorBoundary";
import {SecurityProvider} from "./core/security/SecurityProvider";
import {ApiProvider} from "./core/apollo/ApiProvider";
import { serverErrorEmitter } from "./core/error/serverErrorEmitter";

// axios.interceptors.response.use(response => {
//   if (response.status === 401) {
//     serverErrorEmitter.emit("unauthorized");
//   }
//   return response;
// });
// axios.defaults.withCredentials = !REQUEST_SAME_ORIGIN;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SecurityProvider>
        <ApiProvider>
          <I18nProvider>
            <ServerErrorInterceptor serverErrorEmitter={serverErrorEmitter}>
              <DevSupport
                ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
              >
                <AppErrorBoundary>
                  <App />
                </AppErrorBoundary>
              </DevSupport>
            </ServerErrorInterceptor>
          </I18nProvider>
        </ApiProvider>
      </SecurityProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
