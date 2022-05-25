import React from "react";
import { PetDiseaseLookupCards } from "../app/screens/lookup/PetDiseaseLookupCards";
import { PetTypeLookupCards } from "../app/screens/lookup/PetTypeLookupCards";
import { PetLookupCards } from "../app/screens/lookup/PetLookupCards";
import { OwnerLookupCards } from "../app/screens/lookup/OwnerLookupCards";
import { StandalonePetDiseaseEditor } from "../app/screens/standalone-editor/StandalonePetDiseaseEditor";
import { StandaloneOwnerEditor } from "../app/screens/standalone-editor/StandaloneOwnerEditor";
import { StandalonePetDiseaseList } from "../app/screens/standalone-collection/StandalonePetDiseaseList";
import { StandaloneOwnerList } from "../app/screens/standalone-collection/StandaloneOwnerList";
import { StandaloneOwnerTable } from "../app/screens/standalone-collection/StandaloneOwnerTable";
import { StandaloneOwnerCards } from "../app/screens/standalone-collection/StandaloneOwnerCards";
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
import { PetDiseaseTable } from "../app/screens/management/PetDiseaseTable";
import { PetDiseaseTableEditor } from "../app/screens/management/PetDiseaseTableEditor";
import { PetDiseaseCards } from "../app/screens/management/PetDiseaseCards";
import { PetDiseaseCardsEditor } from "../app/screens/management/PetDiseaseCardsEditor";
import { PetDiseaseList } from "../app/screens/management/PetDiseaseList";
import { PetDiseaseListEditor } from "../app/screens/management/PetDiseaseListEditor";
import { TestNotNullScalarsCards } from "../app/screens/management/TestNotNullScalarsCards";
import { TestNotNullScalarsCardsEditor } from "../app/screens/management/TestNotNullScalarsCardsEditor";
import { TestScalarsTable } from "../app/screens/management/TestScalarsTable";
import { TestScalarsTableEditor } from "../app/screens/management/TestScalarsTableEditor";
import { TestScalarsCards } from "../app/screens/management/TestScalarsCards";
import { TestScalarsCardsEditor } from "../app/screens/management/TestScalarsCardsEditor";
import { PetTable } from "../app/screens/management/PetTable";
import { PetTableEditor } from "../app/screens/management/PetTableEditor";
import { PetList } from "../app/screens/management/PetList";
import { PetListEditor } from "../app/screens/management/PetListEditor";
import { PetCards } from "../app/screens/management/PetCards";
import { PetCardsEditor } from "../app/screens/management/PetCardsEditor";
import { OwnerCardsWithFilter } from "../app/screens/management/OwnerCardsWithFilter";
import { OwnerCardsWithFilterEditor } from "../app/screens/management/OwnerCardsWithFilterEditor";
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
      <ComponentPreview path="/OwnerCardsWithFilterEditor">
        <OwnerCardsWithFilterEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerCardsWithFilter">
        <OwnerCardsWithFilter />
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
      <ComponentPreview path="/TestScalarsCardsEditor">
        <TestScalarsCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/TestScalarsCards">
        <TestScalarsCards />
      </ComponentPreview>
      <ComponentPreview path="/TestScalarsTableEditor">
        <TestScalarsTableEditor />
      </ComponentPreview>
      <ComponentPreview path="/TestScalarsTable">
        <TestScalarsTable />
      </ComponentPreview>
      <ComponentPreview path="/TestNotNullScalarsCardsEditor">
        <TestNotNullScalarsCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/TestNotNullScalarsCards">
        <TestNotNullScalarsCards />
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
      <ComponentPreview path="/StandaloneOwnerEditor">
        <StandaloneOwnerEditor />
      </ComponentPreview>
      <ComponentPreview path="/StandalonePetDiseaseEditor">
        <StandalonePetDiseaseEditor />
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
    </Previews>
  );
};

export default ComponentPreviews;
