import React from "react";
import { PetTypeLookup } from "../app/screens/lookup/PetTypeLookup";
import { PetLookup } from "../app/screens/lookup/PetLookup";
import { OwnerLookup } from "../app/screens/lookup/OwnerLookup";
import { StandaloneOwnerEditor } from "../app/screens/owner/StandaloneOwnerEditor";
import { StandaloneOwnerList } from "../app/screens/standalone-list/StandaloneOwnerList";
import { StandaloneOwnerTable } from "../app/screens/standalone-list/StandaloneOwnerTable";
import { StandaloneOwnerCards } from "../app/screens/standalone-list/StandaloneOwnerCards";
import { ReadOnlyPetList } from "../app/screens/read-only-pet/ReadOnlyPetList";
import { ReadOnlyPetListDetails } from "../app/screens/read-only-pet/ReadOnlyPetListDetails";
import { ReadOnlyPetTable } from "../app/screens/read-only-pet/ReadOnlyPetTable";
import { ReadOnlyPetTableDetails } from "../app/screens/read-only-pet/ReadOnlyPetTableDetails";
import { ReadOnlyPetCards } from "../app/screens/read-only-pet/ReadOnlyPetCards";
import { ReadOnlyPetCardsDetails } from "../app/screens/read-only-pet/ReadOnlyPetCardsDetails";
import { ReadOnlyOwnerList } from "../app/screens/read-only-owner/ReadOnlyOwnerList";
import { ReadOnlyOwnerListDetails } from "../app/screens/read-only-owner/ReadOnlyOwnerListDetails";
import { ReadOnlyOwnerTable } from "../app/screens/read-only-owner/ReadOnlyOwnerTable";
import { ReadOnlyOwnerTableDetails } from "../app/screens/read-only-owner/ReadOnlyOwnerTableDetails";
import { ReadOnlyOwnerCards } from "../app/screens/read-only-owner/ReadOnlyOwnerCards";
import { ReadOnlyOwnerCardsDetails } from "../app/screens/read-only-owner/ReadOnlyOwnerCardsDetails";
import { TestNotNullScalarsCards } from "../app/screens/notnull-scalars/TestNotNullScalarsCards";
import { TestNotNullScalarsCardsEditor } from "../app/screens/notnull-scalars/TestNotNullScalarsCardsEditor";
import { TestScalarsCards } from "../app/screens/scalars/TestScalarsCards";
import { TestScalarsCardsEditor } from "../app/screens/scalars/TestScalarsCardsEditor";
import { PetTable } from "../app/screens/pet/PetTable";
import { PetTableEditor } from "../app/screens/pet/PetTableEditor";
import { PetList } from "../app/screens/pet/PetList";
import { PetListEditor } from "../app/screens/pet/PetListEditor";
import { PetCards } from "../app/screens/pet/PetCards";
import { PetCardsEditor } from "../app/screens/pet/PetCardsEditor";
import { OwnerCardsWithFilter } from "../app/screens/owner/OwnerCardsWithFilter";
import { OwnerCardsWithFilterEditor } from "../app/screens/owner/OwnerCardsWithFilterEditor";
import { OwnerTable } from "../app/screens/owner/OwnerTable";
import { OwnerTableEditor } from "../app/screens/owner/OwnerTableEditor";
import { OwnerList } from "../app/screens/owner/OwnerList";
import { OwnerListEditor } from "../app/screens/owner/OwnerListEditor";
import { OwnerCards } from "../app/screens/owner/OwnerCards";
import { OwnerCardsEditor } from "../app/screens/owner/OwnerCardsEditor";
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
      <ComponentPreview path="/TestNotNullScalarsCardsEditor">
        <TestNotNullScalarsCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/TestNotNullScalarsCards">
        <TestNotNullScalarsCards />
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
      <ComponentPreview path="/StandaloneOwnerCards">
        <StandaloneOwnerCards />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerTable">
        <StandaloneOwnerTable />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerList">
        <StandaloneOwnerList />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerEditor">
        <StandaloneOwnerEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerLookup">
        <OwnerLookup />
      </ComponentPreview>
      <ComponentPreview path="/PetLookup">
        <PetLookup />
      </ComponentPreview>
      <ComponentPreview path="/PetTypeLookup">
        <PetTypeLookup />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
