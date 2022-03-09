import React from "react";
import { StandaloneOwnerCards } from "../app/screens/standalone-list/StandaloneOwnerCards";
import { ReadOnlyOwnerCards } from "../app/screens/read-only-owner/ReadOnlyOwnerCards";
import { ReadOnlyOwnerCardsDetails } from "../app/screens/read-only-owner/ReadOnlyOwnerCardsDetails";
import { PetCards } from "../app/screens/pet/PetCards";
import { PetCardsEditor } from "../app/screens/pet/PetCardsEditor";
import { OwnerList } from "../app/screens/owner/OwnerList";
import { OwnerListEditor } from "../app/screens/owner/OwnerListEditor";
import { OwnerCards } from "../app/screens/owner/OwnerCards";
import { OwnerCardsEditor } from "../app/screens/owner/OwnerCardsEditor";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";

export const ComponentPreviews = () => {
  return (
    <Previews>
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
      <ComponentPreview path="/PetCardsEditor">
        <PetCardsEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetCards">
        <PetCards />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerCardsDetails">
        <ReadOnlyOwnerCardsDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerCards">
        <ReadOnlyOwnerCards />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerCards">
        <StandaloneOwnerCards />
      </ComponentPreview>
    </Previews>
  );
};
