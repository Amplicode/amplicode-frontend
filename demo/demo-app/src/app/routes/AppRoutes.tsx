import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home/Home";
import React from "react";
import { Page404 } from "../../core/routing/Page404";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
