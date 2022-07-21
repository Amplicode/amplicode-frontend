import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App} from "./app/App";
import "antd/dist/antd.min.css";
import { BrowserRouter } from "react-router-dom";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { I18nProvider } from "./core/i18n/providers/I18nProvider";
import { ServerErrorInterceptor } from "./core/error/ServerErrorInterceptor";
import { AppErrorBoundary } from "./core/error/ErrorBoundary";
import {SecurityProvider} from "./core/security/SecurityProvider";
import {GraphQLClientProvider} from "./core/apollo/GraphQLClientProvider";
import { serverErrorEmitter } from "./core/error/serverErrorEmitter";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GraphQLClientProvider>
        <SecurityProvider>
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
        </SecurityProvider>
      </GraphQLClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
