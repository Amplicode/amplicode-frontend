import React from "react";
import { BlankComponent } from "../app/screens/blank/BlankComponent";
import { PetDescriptionLookupCards } from "../app/screens/lookup/PetDescriptionLookupCards";
import { ScalarsNotNullLookupCards } from "../app/screens/lookup/ScalarsNotNullLookupCards";
import { ScalarsLookupCards } from "../app/screens/lookup/ScalarsLookupCards";
import { PetDiseaseLookupCards } from "../app/screens/lookup/PetDiseaseLookupCards";
import { PetTypeLookupCards } from "../app/screens/lookup/PetTypeLookupCards";
import { PetLookupCards } from "../app/screens/lookup/PetLookupCards";
import { OwnerLookupCards } from "../app/screens/lookup/OwnerLookupCards";
import { StandaloneScalarsDetails } from "../app/screens/standalone-details/StandaloneScalarsDetails";
import { StandalonePetDetails } from "../app/screens/standalone-details/StandalonePetDetails";
import { StandaloneOwnerDetails } from "../app/screens/standalone-details/StandaloneOwnerDetails";
import { StandaloneScalarsEditor } from "../app/screens/standalone-editor/StandaloneScalarsEditor";
import { StandalonePetDiseaseEditor } from "../app/screens/standalone-editor/StandalonePetDiseaseEditor";
import { StandaloneOwnerEditor } from "../app/screens/standalone-editor/StandaloneOwnerEditor";
import { StandaloneReadOnlyOwnerTableWithFilterSortPage } from "../app/screens/readonly-collection/StandaloneReadOnlyOwnerTableWithFilterSortPage";
import { StandaloneReadOnlyOwnerListWithFilterSortPage } from "../app/screens/readonly-collection/StandaloneReadOnlyOwnerListWithFilterSortPage";
import { StandaloneReadOnlyOwnerCardsWithFilterSortPage } from "../app/screens/readonly-collection/StandaloneReadOnlyOwnerCardsWithFilterSortPage";
import { StandaloneReadOnlyPetTable } from "../app/screens/no-details-readonly-collection/StandaloneReadOnlyPetTable";
import { StandaloneReadOnlyPetList } from "../app/screens/no-details-readonly-collection/StandaloneReadOnlyPetList";
import { StandaloneReadOnlyPetCards } from "../app/screens/no-details-readonly-collection/StandaloneReadOnlyPetCards";
import { StandaloneScalarsCards } from "../app/screens/standalone-collection/StandaloneScalarsCards";
import { StandalonePetDiseaseList } from "../app/screens/standalone-collection/StandalonePetDiseaseList";
import { StandaloneOwnerList } from "../app/screens/standalone-collection/StandaloneOwnerList";
import { StandaloneOwnerTable } from "../app/screens/standalone-collection/StandaloneOwnerTable";
import { StandaloneOwnerCards } from "../app/screens/standalone-collection/StandaloneOwnerCards";
import { ReadOnlyOwnerTableWithFilterSortPage } from "../app/screens/readonly-collection/ReadOnlyOwnerTableWithFilterSortPage";
import { ReadOnlyOwnerTableWithFilterSortPageDetails } from "../app/screens/readonly-collection/ReadOnlyOwnerTableWithFilterSortPageDetails";
import { ReadOnlyOwnerListWithFilterSortPage } from "../app/screens/readonly-collection/ReadOnlyOwnerListWithFilterSortPage";
import { ReadOnlyOwnerListWithFilterSortPageDetails } from "../app/screens/readonly-collection/ReadOnlyOwnerListWithFilterSortPageDetails";
import { ReadOnlyOwnerCardsWithFilterSortPage } from "../app/screens/readonly-collection/ReadOnlyOwnerCardsWithFilterSortPage";
import { ReadOnlyOwnerCardsWithFilterSortPageDetails } from "../app/screens/readonly-collection/ReadOnlyOwnerCardsWithFilterSortPageDetails";
import { ReadOnlyPetDiseaseList } from "../app/screens/readonly-collection/ReadOnlyPetDiseaseList";
import { ReadOnlyPetDiseaseListDetails } from "../app/screens/readonly-collection/ReadOnlyPetDiseaseListDetails";
import { ReadOnlyScalarsList } from "../app/screens/readonly-collection/ReadOnlyScalarsList";
import { ReadOnlyScalarsListDetails } from "../app/screens/readonly-collection/ReadOnlyScalarsListDetails";
import { ReadOnlyPetList } from "../app/screens/readonly-collection/ReadOnlyPetList";
import { ReadOnlyPetListDetails } from "../app/screens/readonly-collection/ReadOnlyPetListDetails";
import { ReadOnlyPetTable } from "../app/screens/readonly-collection/ReadOnlyPetTable";
import { ReadOnlyPetTableDetails } from "../app/screens/readonly-collection/ReadOnlyPetTableDetails";
import { ReadOnlyPetCards } from "../app/screens/readonly-collection/ReadOnlyPetCards";
import { ReadOnlyPetCardsDetails } from "../app/screens/readonly-collection/ReadOnlyPetCardsDetails";
import { ReadOnlyOwnerList } from "../app/screens/readonly-collection/ReadOnlyOwnerList";
import { ReadOnlyOwnerListDetails } from "../app/screens/readonly-collection/ReadOnlyOwnerListDetails";
import { ReadOnlyOwnerTable } from "../app/screens/readonly-collection/ReadOnlyOwnerTable";
import { ReadOnlyOwnerTableDetails } from "../app/screens/readonly-collection/ReadOnlyOwnerTableDetails";
import { ReadOnlyOwnerCards } from "../app/screens/readonly-collection/ReadOnlyOwnerCards";
import { ReadOnlyOwnerCardsDetails } from "../app/screens/readonly-collection/ReadOnlyOwnerCardsDetails";
import { VisitWithFilter } from "../app/screens/management/VisitWithFilter";
import { VisitWithFilterEditor } from "../app/screens/management/VisitWithFilterEditor";
import { PetTypeTable } from "../app/screens/management/PetTypeTable";
import { PetTypeTableEditor } from "../app/screens/management/PetTypeTableEditor";
import { PetDiseaseTable } from "../app/screens/management/PetDiseaseTable";
import { PetDiseaseTableEditor } from "../app/screens/management/PetDiseaseTableEditor";
import { PetDiseaseCards } from "../app/screens/management/PetDiseaseCards";
import { PetDiseaseCardsEditor } from "../app/screens/management/PetDiseaseCardsEditor";
import { PetDiseaseList } from "../app/screens/management/PetDiseaseList";
import { PetDiseaseListEditor } from "../app/screens/management/PetDiseaseListEditor";
import { ScalarsNotNullCards } from "../app/screens/management/ScalarsNotNullCards";
import { ScalarsNotNullCardsEditor } from "../app/screens/management/ScalarsNotNullCardsEditor";
import { ScalarsTable } from "../app/screens/management/ScalarsTable";
import { ScalarsTableEditor } from "../app/screens/management/ScalarsTableEditor";
import { ScalarsList } from "../app/screens/management/ScalarsList";
import { ScalarsListEditor } from "../app/screens/management/ScalarsListEditor";
import { PetTable } from "../app/screens/management/PetTable";
import { PetTableEditor } from "../app/screens/management/PetTableEditor";
import { PetList } from "../app/screens/management/PetList";
import { PetListEditor } from "../app/screens/management/PetListEditor";
import { PetCards } from "../app/screens/management/PetCards";
import { PetCardsEditor } from "../app/screens/management/PetCardsEditor";
import { OwnerTableWithFilterSortPage } from "../app/screens/management/OwnerTableWithFilterSortPage";
import { OwnerTableWithFilterSortPageEditor } from "../app/screens/management/OwnerTableWithFilterSortPageEditor";
import { OwnerListWithFilterSortPage } from "../app/screens/management/OwnerListWithFilterSortPage";
import { OwnerListsWithFilterSortPageEditor } from "../app/screens/management/OwnerListsWithFilterSortPageEditor";
import { OwnerCardsWithFilterSortPage } from "../app/screens/management/OwnerCardsWithFilterSortPage";
import { OwnerCardsWithFilterSortPageEditor } from "../app/screens/management/OwnerCardsWithFilterSortPageEditor";
import { OwnerTableWithMultiselect } from "../app/screens/management/OwnerTableWithMultiselect";
import { OwnerTableWithMultiselectEditor } from "../app/screens/management/OwnerTableWithMultiselectEditor";
import { OwnerTable } from "../app/screens/management/OwnerTable";
import { OwnerTableEditor } from "../app/screens/management/OwnerTableEditor";
import { OwnerList } from "../app/screens/management/OwnerList";
import { OwnerListEditor } from "../app/screens/management/OwnerListEditor";
import { OwnerCards } from "../app/screens/management/OwnerCards";
import { OwnerCardsEditor } from "../app/screens/management/OwnerCardsEditor";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/OwnerCardsEditor">
        <OwnerCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerCards">
        <OwnerCards />
      </ComponentPreview>
      <ComponentPreview path="/OwnerListEditor">
        <OwnerListEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerList">
        <OwnerList />
      </ComponentPreview>
      <ComponentPreview path="/OwnerTableEditor">
        <OwnerTableEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerTable">
        <OwnerTable />
      </ComponentPreview>
      <ComponentPreview path="/OwnerTableWithMultiselectEditor">
        <OwnerTableWithMultiselectEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerTableWithMultiselect">
        <OwnerTableWithMultiselect />
      </ComponentPreview>
      <ComponentPreview path="/OwnerCardsWithFilterSortPageEditor">
        <OwnerCardsWithFilterSortPageEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerCardsWithFilterSortPage">
        <OwnerCardsWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/OwnerListsWithFilterSortPageEditor">
        <OwnerListsWithFilterSortPageEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerListWithFilterSortPage">
        <OwnerListWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/OwnerTableWithFilterSortPageEditor">
        <OwnerTableWithFilterSortPageEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerTableWithFilterSortPage">
        <OwnerTableWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/PetCardsEditor">
        <PetCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetCards">
        <PetCards />
      </ComponentPreview>
      <ComponentPreview path="/PetListEditor">
        <PetListEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetList">
        <PetList />
      </ComponentPreview>
      <ComponentPreview path="/PetTableEditor">
        <PetTableEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetTable">
        <PetTable />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsListEditor">
        <ScalarsListEditor />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsList">
        <ScalarsList />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsTableEditor">
        <ScalarsTableEditor />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsTable">
        <ScalarsTable />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsNotNullCardsEditor">
        <ScalarsNotNullCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsNotNullCards">
        <ScalarsNotNullCards />
      </ComponentPreview>
      <ComponentPreview path="/PetDiseaseListEditor">
        <PetDiseaseListEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetDiseaseList">
        <PetDiseaseList />
      </ComponentPreview>
      <ComponentPreview path="/PetDiseaseCardsEditor">
        <PetDiseaseCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetDiseaseCards">
        <PetDiseaseCards />
      </ComponentPreview>
      <ComponentPreview path="/PetDiseaseTableEditor">
        <PetDiseaseTableEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetDiseaseTable">
        <PetDiseaseTable />
      </ComponentPreview>
      <ComponentPreview path="/PetTypeTableEditor">
        <PetTypeTableEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetTypeTable">
        <PetTypeTable />
      </ComponentPreview>
      <ComponentPreview path="/VisitWithFilterEditor">
        <VisitWithFilterEditor />
      </ComponentPreview>
      <ComponentPreview path="/VisitWithFilter">
        <VisitWithFilter />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerCardsDetails">
        <ReadOnlyOwnerCardsDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerCards">
        <ReadOnlyOwnerCards />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerTableDetails">
        <ReadOnlyOwnerTableDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerTable">
        <ReadOnlyOwnerTable />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerListDetails">
        <ReadOnlyOwnerListDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerList">
        <ReadOnlyOwnerList />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetCardsDetails">
        <ReadOnlyPetCardsDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetCards">
        <ReadOnlyPetCards />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetTableDetails">
        <ReadOnlyPetTableDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetTable">
        <ReadOnlyPetTable />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetListDetails">
        <ReadOnlyPetListDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetList">
        <ReadOnlyPetList />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyScalarsListDetails">
        <ReadOnlyScalarsListDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyScalarsList">
        <ReadOnlyScalarsList />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetDiseaseListDetails">
        <ReadOnlyPetDiseaseListDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyPetDiseaseList">
        <ReadOnlyPetDiseaseList />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerCardsWithFilterSortPageDetails">
        <ReadOnlyOwnerCardsWithFilterSortPageDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerCardsWithFilterSortPage">
        <ReadOnlyOwnerCardsWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerListWithFilterSortPageDetails">
        <ReadOnlyOwnerListWithFilterSortPageDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerListWithFilterSortPage">
        <ReadOnlyOwnerListWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerTableWithFilterSortPageDetails">
        <ReadOnlyOwnerTableWithFilterSortPageDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerTableWithFilterSortPage">
        <ReadOnlyOwnerTableWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerCards">
        <StandaloneOwnerCards />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerTable">
        <StandaloneOwnerTable />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerList">
        <StandaloneOwnerList />
      </ComponentPreview>
      <ComponentPreview path="/StandalonePetDiseaseList">
        <StandalonePetDiseaseList />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneScalarsCards">
        <StandaloneScalarsCards />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneReadOnlyPetCards">
        <StandaloneReadOnlyPetCards />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneReadOnlyPetList">
        <StandaloneReadOnlyPetList />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneReadOnlyPetTable">
        <StandaloneReadOnlyPetTable />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneReadOnlyOwnerCardsWithFilterSortPage">
        <StandaloneReadOnlyOwnerCardsWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneReadOnlyOwnerListWithFilterSortPage">
        <StandaloneReadOnlyOwnerListWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneReadOnlyOwnerTableWithFilterSortPage">
        <StandaloneReadOnlyOwnerTableWithFilterSortPage />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerEditor">
        <StandaloneOwnerEditor />
      </ComponentPreview>
      <ComponentPreview path="/StandalonePetDiseaseEditor">
        <StandalonePetDiseaseEditor />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneScalarsEditor">
        <StandaloneScalarsEditor />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerDetails">
        <StandaloneOwnerDetails />
      </ComponentPreview>
      <ComponentPreview path="/StandalonePetDetails">
        <StandalonePetDetails />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneScalarsDetails">
        <StandaloneScalarsDetails />
      </ComponentPreview>
      <ComponentPreview path="/OwnerLookupCards">
        <OwnerLookupCards />
      </ComponentPreview>
      <ComponentPreview path="/PetLookupCards">
        <PetLookupCards />
      </ComponentPreview>
      <ComponentPreview path="/PetTypeLookupCards">
        <PetTypeLookupCards />
      </ComponentPreview>
      <ComponentPreview path="/PetDiseaseLookupCards">
        <PetDiseaseLookupCards />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsLookupCards">
        <ScalarsLookupCards />
      </ComponentPreview>
      <ComponentPreview path="/ScalarsNotNullLookupCards">
        <ScalarsNotNullLookupCards />
      </ComponentPreview>
      <ComponentPreview path="/PetDescriptionLookupCards">
        <PetDescriptionLookupCards />
      </ComponentPreview>
      <ComponentPreview path="/BlankComponent">
        <BlankComponent />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
