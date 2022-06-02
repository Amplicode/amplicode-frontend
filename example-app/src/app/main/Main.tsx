import React from "react";
import { observer } from "mobx-react";
import { Layout } from "antd";
import { AppHeader } from "../header/Header";
import { AppRoutes } from "../routes/AppRoutes";
import { AppMenu } from "../menu/Menu";

export const AppMain = observer(() => {
  return (
    <Layout className="main-layout">
      <Layout.Header>
        <AppHeader />
      </Layout.Header>
      <Layout className="layout-container">
        <Layout.Sider
          width={200}
          breakpoint="sm"
          collapsedWidth={0}
          className="layout-sider"
        >
          <AppMenu />
        </Layout.Sider>
        <Layout className="layout-content">
          <Layout.Content>
            <AppRoutes />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
});
