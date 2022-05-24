import { PetDiseaseLookup } from "../screens/lookup/PetDiseaseLookup";
import { PetTypeLookup } from "../screens/lookup/PetTypeLookup";
import { PetLookup } from "../screens/lookup/PetLookup";
import { OwnerLookup } from "../screens/lookup/OwnerLookup";
import { StandalonePetDiseaseEditor } from "../screens/standalone-pet-disease-editor/StandalonePetDiseaseEditor";
import { StandaloneOwnerEditor } from "../screens/owner/StandaloneOwnerEditor";
import { StandalonePetDiseaseList } from "../screens/standalone-pet-disease-list/StandalonePetDiseaseList";
import { StandaloneOwnerList } from "../screens/standalone-list/StandaloneOwnerList";
import { StandaloneOwnerTable } from "../screens/standalone-list/StandaloneOwnerTable";
import { StandaloneOwnerCards } from "../screens/standalone-list/StandaloneOwnerCards";
import { ReadOnlyPetDiseaseListScreenLayout } from "../screens/read-only-pet-disease/ReadOnlyPetDiseaseListScreenLayout";
import { ReadOnlyScalarsListScreenLayout } from "../screens/read-only-scalars/ReadOnlyScalarsListScreenLayout";
import { ReadOnlyPetListScreenLayout } from "../screens/read-only-pet/ReadOnlyPetListScreenLayout";
import { ReadOnlyPetTableScreenLayout } from "../screens/read-only-pet/ReadOnlyPetTableScreenLayout";
import { ReadOnlyPetCardsScreenLayout } from "../screens/read-only-pet/ReadOnlyPetCardsScreenLayout";
import { ReadOnlyOwnerListScreenLayout } from "../screens/read-only-owner/ReadOnlyOwnerListScreenLayout";
import { ReadOnlyOwnerTableScreenLayout } from "../screens/read-only-owner/ReadOnlyOwnerTableScreenLayout";
import { ReadOnlyOwnerCardsScreenLayout } from "../screens/read-only-owner/ReadOnlyOwnerCardsScreenLayout";
import { PetDiseaseTableScreenLayout } from "../screens/pet-disease-management/PetDiseaseTableScreenLayout";
import { PetDiseaseCardsScreenLayout } from "../screens/pet-disease-management/PetDiseaseCardsScreenLayout";
import { PetDiseaseListScreenLayout } from "../screens/pet-disease-management/PetDiseaseListScreenLayout";
import { TestNotNullScalarsCardsScreenLayout } from "../screens/notnull-scalars/TestNotNullScalarsCardsScreenLayout";
import { TestScalarsTableScreenLayout } from "../screens/scalars/TestScalarsTableScreenLayout";
import { TestScalarsCardsScreenLayout } from "../screens/scalars/TestScalarsCardsScreenLayout";
import { PetTableScreenLayout } from "../screens/pet/PetTableScreenLayout";
import { PetListScreenLayout } from "../screens/pet/PetListScreenLayout";
import { PetCardsScreenLayout } from "../screens/pet/PetCardsScreenLayout";
import { OwnerCardsWithFilterScreenLayout } from "../screens/owner/OwnerCardsWithFilterScreenLayout";
import { OwnerTableScreenLayout } from "../screens/owner/OwnerTableScreenLayout";
import { OwnerListScreenLayout } from "../screens/owner/OwnerListScreenLayout";
import { OwnerCardsScreenLayout } from "../screens/owner/OwnerCardsScreenLayout";
import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home/Home";
import React from "react";
import { Page404 } from "../../core/routing/Page404";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
      <Route path="owner-cards">
        <Route index element={<OwnerCardsScreenLayout />} />
        <Route path=":recordId" element={<OwnerCardsScreenLayout />} />
      </Route>
      <Route path="owner-list">
        <Route index element={<OwnerListScreenLayout />} />
        <Route path=":recordId" element={<OwnerListScreenLayout />} />
      </Route>
      <Route path="owner-table">
        <Route index element={<OwnerTableScreenLayout />} />
        <Route path=":recordId" element={<OwnerTableScreenLayout />} />
      </Route>
      <Route path="owner-cards-with-filter">
        <Route index element={<OwnerCardsWithFilterScreenLayout />} />
        <Route
          path=":recordId"
          element={<OwnerCardsWithFilterScreenLayout />}
        />
      </Route>
      <Route path="pet-cards">
        <Route index element={<PetCardsScreenLayout />} />
        <Route path=":recordId" element={<PetCardsScreenLayout />} />
      </Route>
      <Route path="pet-list">
        <Route index element={<PetListScreenLayout />} />
        <Route path=":recordId" element={<PetListScreenLayout />} />
      </Route>
      <Route path="pet-table">
        <Route index element={<PetTableScreenLayout />} />
        <Route path=":recordId" element={<PetTableScreenLayout />} />
      </Route>
      <Route path="scalars-cards">
        <Route index element={<TestScalarsCardsScreenLayout />} />
        <Route path=":recordId" element={<TestScalarsCardsScreenLayout />} />
      </Route>
      <Route path="scalars-table">
        <Route index element={<TestScalarsTableScreenLayout />} />
        <Route path=":recordId" element={<TestScalarsTableScreenLayout />} />
      </Route>
      <Route path="notnull-scalars-cards">
        <Route index element={<TestNotNullScalarsCardsScreenLayout />} />
        <Route
          path=":recordId"
          element={<TestNotNullScalarsCardsScreenLayout />}
        />
      </Route>
      <Route path="pet-disease-list">
        <Route index element={<PetDiseaseListScreenLayout />} />
        <Route path=":recordId" element={<PetDiseaseListScreenLayout />} />
      </Route>
      <Route path="pet-disease-cards">
        <Route index element={<PetDiseaseCardsScreenLayout />} />
        <Route path=":recordId" element={<PetDiseaseCardsScreenLayout />} />
      </Route>
      <Route path="pet-disease-table">
        <Route index element={<PetDiseaseTableScreenLayout />} />
        <Route path=":recordId" element={<PetDiseaseTableScreenLayout />} />
      </Route>
      <Route path="read-only-owner-cards">
        <Route index element={<ReadOnlyOwnerCardsScreenLayout />} />
        <Route path=":recordId" element={<ReadOnlyOwnerCardsScreenLayout />} />
      </Route>
      <Route path="read-only-owner-table">
        <Route index element={<ReadOnlyOwnerTableScreenLayout />} />
        <Route path=":recordId" element={<ReadOnlyOwnerTableScreenLayout />} />
      </Route>
      <Route path="read-only-owner-list">
        <Route index element={<ReadOnlyOwnerListScreenLayout />} />
        <Route path=":recordId" element={<ReadOnlyOwnerListScreenLayout />} />
      </Route>
      <Route path="read-only-pet-cards">
        <Route index element={<ReadOnlyPetCardsScreenLayout />} />
        <Route path=":recordId" element={<ReadOnlyPetCardsScreenLayout />} />
      </Route>
      <Route path="read-only-pet-table">
        <Route index element={<ReadOnlyPetTableScreenLayout />} />
        <Route path=":recordId" element={<ReadOnlyPetTableScreenLayout />} />
      </Route>
      <Route path="read-only-pet-list">
        <Route index element={<ReadOnlyPetListScreenLayout />} />
        <Route path=":recordId" element={<ReadOnlyPetListScreenLayout />} />
      </Route>
      <Route path="read-only-scalars-list">
        <Route index element={<ReadOnlyScalarsListScreenLayout />} />
        <Route path=":recordId" element={<ReadOnlyScalarsListScreenLayout />} />
      </Route>
      <Route path="read-only-pet-disease-list">
        <Route index element={<ReadOnlyPetDiseaseListScreenLayout />} />
        <Route
          path=":recordId"
          element={<ReadOnlyPetDiseaseListScreenLayout />}
        />
      </Route>
      <Route path="standalone-owner-cards">
        <Route index element={<StandaloneOwnerCards />} />
        <Route path=":recordId" element={<StandaloneOwnerCards />} />
      </Route>
      <Route path="standalone-owner-table">
        <Route index element={<StandaloneOwnerTable />} />
        <Route path=":recordId" element={<StandaloneOwnerTable />} />
      </Route>
      <Route path="standalone-owner-list">
        <Route index element={<StandaloneOwnerList />} />
        <Route path=":recordId" element={<StandaloneOwnerList />} />
      </Route>
      <Route path="standalone-pet-disease-list">
        <Route index element={<StandalonePetDiseaseList />} />
        <Route path=":recordId" element={<StandalonePetDiseaseList />} />
      </Route>
      <Route path="standalone-owner-editor">
        <Route index element={<StandaloneOwnerEditor />} />
        <Route path=":recordId" element={<StandaloneOwnerEditor />} />
      </Route>
      <Route path="standalone-pet-disease-editor">
        <Route index element={<StandalonePetDiseaseEditor />} />
        <Route path=":recordId" element={<StandalonePetDiseaseEditor />} />
      </Route>
      <Route path="owner-lookup-cards">
        <Route index element={<OwnerLookup />} />
        <Route path=":recordId" element={<OwnerLookup />} />
      </Route>
      <Route path="pet-lookup-cards">
        <Route index element={<PetLookup />} />
        <Route path=":recordId" element={<PetLookup />} />
      </Route>
      <Route path="pet-type-lookup-cards">
        <Route index element={<PetTypeLookup />} />
        <Route path=":recordId" element={<PetTypeLookup />} />
      </Route>
      <Route path="pet-disease-lookup-cards">
        <Route index element={<PetDiseaseLookup />} />
        <Route path=":recordId" element={<PetDiseaseLookup />} />
      </Route>
    </Routes>
  );
}
