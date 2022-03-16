import React from "react";
import { StandaloneOwnerTable } from "../app/screens/standalone-list/StandaloneOwnerTable";
import { StandaloneOwnerCards } from "../app/screens/standalone-list/StandaloneOwnerCards";
import { ReadOnlyOwnerTable } from "../app/screens/read-only-owner/ReadOnlyOwnerTable";
import { ReadOnlyOwnerTableDetails } from "../app/screens/read-only-owner/ReadOnlyOwnerTableDetails";
import { ReadOnlyOwnerCards } from "../app/screens/read-only-owner/ReadOnlyOwnerCards";
import { ReadOnlyOwnerCardsDetails } from "../app/screens/read-only-owner/ReadOnlyOwnerCardsDetails";
import { PetTable } from "../app/screens/pet/PetTable";
import { PetTableEditor } from "../app/screens/pet/PetTableEditor";
import { PetList } from "../app/screens/pet/PetList";
import { PetListEditor } from "../app/screens/pet/PetListEditor";
import { PetCards } from "../app/screens/pet/PetCards";
import { PetCardsEditor } from "../app/screens/pet/PetCardsEditor";
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
      <ComponentPreview path="/StandaloneOwnerCards">
        <StandaloneOwnerCards />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerTable">
        <StandaloneOwnerTable />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
