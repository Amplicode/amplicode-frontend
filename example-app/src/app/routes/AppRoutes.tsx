import { BlankComponent } from "../screens/blank/BlankComponent";
import { PetDescriptionLookupCards } from "../screens/lookup/PetDescriptionLookupCards";
import { ScalarsNotNullLookupCards } from "../screens/lookup/ScalarsNotNullLookupCards";
import { ScalarsLookupCards } from "../screens/lookup/ScalarsLookupCards";
import { PetDiseaseLookupCards } from "../screens/lookup/PetDiseaseLookupCards";
import { PetTypeLookupCards } from "../screens/lookup/PetTypeLookupCards";
import { PetLookupCards } from "../screens/lookup/PetLookupCards";
import { OwnerLookupCards } from "../screens/lookup/OwnerLookupCards";
import { StandaloneScalarsDetails } from "../screens/standalone-details/StandaloneScalarsDetails";
import { StandalonePetDetails } from "../screens/standalone-details/StandalonePetDetails";
import { StandaloneOwnerDetails } from "../screens/standalone-details/StandaloneOwnerDetails";
import { StandaloneScalarsEditor } from "../screens/standalone-editor/StandaloneScalarsEditor";
import { StandalonePetDiseaseEditor } from "../screens/standalone-editor/StandalonePetDiseaseEditor";
import { StandaloneOwnerEditor } from "../screens/standalone-editor/StandaloneOwnerEditor";
import { StandaloneScalarsCards } from "../screens/standalone-collection/StandaloneScalarsCards";
import { StandalonePetDiseaseList } from "../screens/standalone-collection/StandalonePetDiseaseList";
import { StandaloneOwnerList } from "../screens/standalone-collection/StandaloneOwnerList";
import { StandaloneOwnerTable } from "../screens/standalone-collection/StandaloneOwnerTable";
import { StandaloneOwnerCards } from "../screens/standalone-collection/StandaloneOwnerCards";
import { ReadOnlyPetDiseaseListScreenLayout } from "../screens/readonly-collection/ReadOnlyPetDiseaseListScreenLayout";
import { ReadOnlyScalarsListScreenLayout } from "../screens/readonly-collection/ReadOnlyScalarsListScreenLayout";
import { ReadOnlyPetListScreenLayout } from "../screens/readonly-collection/ReadOnlyPetListScreenLayout";
import { ReadOnlyPetTableScreenLayout } from "../screens/readonly-collection/ReadOnlyPetTableScreenLayout";
import { ReadOnlyPetCardsScreenLayout } from "../screens/readonly-collection/ReadOnlyPetCardsScreenLayout";
import { ReadOnlyOwnerListScreenLayout } from "../screens/readonly-collection/ReadOnlyOwnerListScreenLayout";
import { ReadOnlyOwnerTableScreenLayout } from "../screens/readonly-collection/ReadOnlyOwnerTableScreenLayout";
import { ReadOnlyOwnerCardsScreenLayout } from "../screens/readonly-collection/ReadOnlyOwnerCardsScreenLayout";
import { VisitWithFilterScreenLayout } from "../screens/management/VisitWithFilterScreenLayout";
import { PetTypeTableScreenLayout } from "../screens/management/PetTypeTableScreenLayout";
import { PetDiseaseTableScreenLayout } from "../screens/management/PetDiseaseTableScreenLayout";
import { PetDiseaseCardsScreenLayout } from "../screens/management/PetDiseaseCardsScreenLayout";
import { PetDiseaseListScreenLayout } from "../screens/management/PetDiseaseListScreenLayout";
import { ScalarsNotNullCardsScreenLayout } from "../screens/management/ScalarsNotNullCardsScreenLayout";
import { ScalarsTableScreenLayout } from "../screens/management/ScalarsTableScreenLayout";
import { ScalarsListScreenLayout } from "../screens/management/ScalarsListScreenLayout";
import { PetTableScreenLayout } from "../screens/management/PetTableScreenLayout";
import { PetListScreenLayout } from "../screens/management/PetListScreenLayout";
import { PetCardsScreenLayout } from "../screens/management/PetCardsScreenLayout";
import { OwnerTableWithMultiselectScreenLayout } from "../screens/management/OwnerTableWithMultiselectScreenLayout";
import { OwnerCardsWithFilterScreenLayout } from "../screens/management/OwnerCardsWithFilterScreenLayout";
import { OwnerTableScreenLayout } from "../screens/management/OwnerTableScreenLayout";
import { OwnerListScreenLayout } from "../screens/management/OwnerListScreenLayout";
import { OwnerCardsScreenLayout } from "../screens/management/OwnerCardsScreenLayout";
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
      <Route path="owner-table-with-multiselect">
        <Route index element={<OwnerTableWithMultiselectScreenLayout />} />
        <Route
          path=":recordId"
          element={<OwnerTableWithMultiselectScreenLayout />}
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
      <Route path="scalars-list">
        <Route index element={<ScalarsListScreenLayout />} />
        <Route path=":recordId" element={<ScalarsListScreenLayout />} />
      </Route>
      <Route path="scalars-table">
        <Route index element={<ScalarsTableScreenLayout />} />
        <Route path=":recordId" element={<ScalarsTableScreenLayout />} />
      </Route>
      <Route path="scalars-notnull-cards">
        <Route index element={<ScalarsNotNullCardsScreenLayout />} />
        <Route path=":recordId" element={<ScalarsNotNullCardsScreenLayout />} />
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
      <Route path="pet-type-table">
        <Route index element={<PetTypeTableScreenLayout />} />
        <Route path=":recordId" element={<PetTypeTableScreenLayout />} />
      </Route>
      <Route path="visit-with-filter">
        <Route index element={<VisitWithFilterScreenLayout />} />
        <Route path=":recordId" element={<VisitWithFilterScreenLayout />} />
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
      <Route path="standalone-scalars-cards">
        <Route index element={<StandaloneScalarsCards />} />
        <Route path=":recordId" element={<StandaloneScalarsCards />} />
      </Route>
      <Route path="standalone-owner-editor">
        <Route index element={<StandaloneOwnerEditor />} />
        <Route path=":recordId" element={<StandaloneOwnerEditor />} />
      </Route>
      <Route path="standalone-pet-disease-editor">
        <Route index element={<StandalonePetDiseaseEditor />} />
        <Route path=":recordId" element={<StandalonePetDiseaseEditor />} />
      </Route>
      <Route path="standalone-scalars-editor">
        <Route index element={<StandaloneScalarsEditor />} />
        <Route path=":recordId" element={<StandaloneScalarsEditor />} />
      </Route>
      <Route path="standalone-owner-details">
        <Route index element={<StandaloneOwnerDetails />} />
        <Route path=":recordId" element={<StandaloneOwnerDetails />} />
      </Route>
      <Route path="standalone-pet-details">
        <Route index element={<StandalonePetDetails />} />
        <Route path=":recordId" element={<StandalonePetDetails />} />
      </Route>
      <Route path="standalone-scalars-details">
        <Route index element={<StandaloneScalarsDetails />} />
        <Route path=":recordId" element={<StandaloneScalarsDetails />} />
      </Route>
      <Route path="owner-lookup-cards">
        <Route index element={<OwnerLookupCards />} />
        <Route path=":recordId" element={<OwnerLookupCards />} />
      </Route>
      <Route path="pet-lookup-cards">
        <Route index element={<PetLookupCards />} />
        <Route path=":recordId" element={<PetLookupCards />} />
      </Route>
      <Route path="pet-type-lookup-cards">
        <Route index element={<PetTypeLookupCards />} />
        <Route path=":recordId" element={<PetTypeLookupCards />} />
      </Route>
      <Route path="pet-disease-lookup-cards">
        <Route index element={<PetDiseaseLookupCards />} />
        <Route path=":recordId" element={<PetDiseaseLookupCards />} />
      </Route>
      <Route path="scalars-lookup-cards">
        <Route index element={<ScalarsLookupCards />} />
        <Route path=":recordId" element={<ScalarsLookupCards />} />
      </Route>
      <Route path="scalars-notnull-lookup-cards">
        <Route index element={<ScalarsNotNullLookupCards />} />
        <Route path=":recordId" element={<ScalarsNotNullLookupCards />} />
      </Route>
      <Route path="pet-description-lookup-cards">
        <Route index element={<PetDescriptionLookupCards />} />
        <Route path=":recordId" element={<PetDescriptionLookupCards />} />
      </Route>
      <Route path="blank-component">
        <Route index element={<BlankComponent />} />
        <Route path=":recordId" element={<BlankComponent />} />
      </Route>
    </Routes>
  );
}
