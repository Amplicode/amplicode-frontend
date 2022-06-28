import { ScalarsListScreenLayout } from "../screens/management/ScalarsListScreenLayout";
import { PetTableScreenLayout } from "../screens/management/PetTableScreenLayout";
import { OwnerTableScreenLayout } from "../screens/management/OwnerTableScreenLayout";
import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home/Home";
import React from "react";
import { Page404 } from "../../core/routing/Page404";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
      <Route path="owner-table">
        <Route index element={<OwnerTableScreenLayout />} />
        <Route path=":recordId" element={<OwnerTableScreenLayout />} />
      </Route>
      <Route path="pet-table">
        <Route index element={<PetTableScreenLayout />} />
        <Route path=":recordId" element={<PetTableScreenLayout />} />
      </Route>
      <Route path="scalars-list">
        <Route index element={<ScalarsListScreenLayout />} />
        <Route path=":recordId" element={<ScalarsListScreenLayout />} />
      </Route>
    </Routes>
  );
}
