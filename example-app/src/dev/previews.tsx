import React from "react";
import { StandaloneOwnerList } from "../app/screens/standalone-list/StandaloneOwnerList";
import { ReadOnlyOwnerList } from "../app/screens/read-only-owner/ReadOnlyOwnerList";
import { ReadOnlyOwnerDetails } from "../app/screens/read-only-owner/ReadOnlyOwnerDetails";
import { PetList } from "../app/screens/pet/PetList";
import { PetEditor } from "../app/screens/pet/PetEditor";
import { OwnerList } from "../app/screens/owner/OwnerList";
import { OwnerEditor } from "../app/screens/owner/OwnerEditor";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";

export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/OwnerEditor">
        <OwnerEditor />
      </ComponentPreview>
      <ComponentPreview path="/OwnerList">
        <OwnerList />
      </ComponentPreview>
      <ComponentPreview path="/PetEditor">
        <PetEditor />
      </ComponentPreview>
      <ComponentPreview path="/PetList">
        <PetList />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerDetails">
        <ReadOnlyOwnerDetails />
      </ComponentPreview>
      <ComponentPreview path="/ReadOnlyOwnerList">
        <ReadOnlyOwnerList />
      </ComponentPreview>
      <ComponentPreview path="/StandaloneOwnerList">
        <StandaloneOwnerList />
      </ComponentPreview>
    </Previews>
  );
};
