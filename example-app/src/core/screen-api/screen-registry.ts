import { PetTypeLookup } from "../../app/screens/lookup/PetTypeLookup";
import { PetLookup } from "../../app/screens/lookup/PetLookup";
import { OwnerLookup } from "../../app/screens/lookup/OwnerLookup";
import { StandaloneOwnerEditor } from "../../app/screens/owner/StandaloneOwnerEditor";
import { StandaloneOwnerList } from "../../app/screens/standalone-list/StandaloneOwnerList";
import { StandaloneOwnerTable } from "../../app/screens/standalone-list/StandaloneOwnerTable";
import { StandaloneOwnerCards } from "../../app/screens/standalone-list/StandaloneOwnerCards";
import { ReadOnlyOwnerList } from "../../app/screens/read-only-owner/ReadOnlyOwnerList";
import { ReadOnlyOwnerTable } from "../../app/screens/read-only-owner/ReadOnlyOwnerTable";
import { ReadOnlyOwnerCards } from "../../app/screens/read-only-owner/ReadOnlyOwnerCards";
import { PetTable } from "../../app/screens/pet/PetTable";
import { PetList } from "../../app/screens/pet/PetList";
import { PetCards } from "../../app/screens/pet/PetCards";
import { OwnerTable } from "../../app/screens/owner/OwnerTable";
import { OwnerList } from "../../app/screens/owner/OwnerList";
import { OwnerCards } from "../../app/screens/owner/OwnerCards";
import { Home } from "../../app/screens/home/Home";
import { screenStore } from "@amplicode/react-core";

screenStore.registerScreen("home", {
  component: Home,
  captionKey: "screen.home"
});

screenStore.registerScreen("owner-cards", {
  component: OwnerCards,
  captionKey: "screen.OwnerCards"
});

screenStore.registerScreen("owner-list", {
  component: OwnerList,
  captionKey: "screen.OwnerList"
});

screenStore.registerScreen("owner-table", {
  component: OwnerTable,
  captionKey: "screen.OwnerTable"
});

screenStore.registerScreen("pet-cards", {
  component: PetCards,
  captionKey: "screen.PetCards"
});

screenStore.registerScreen("pet-list", {
  component: PetList,
  captionKey: "screen.PetList"
});

screenStore.registerScreen("pet-table", {
  component: PetTable,
  captionKey: "screen.PetTable"
});

screenStore.registerScreen("read-only-owner-cards", {
  component: ReadOnlyOwnerCards,
  captionKey: "screen.ReadOnlyOwnerCards"
});

screenStore.registerScreen("read-only-owner-table", {
  component: ReadOnlyOwnerTable,
  captionKey: "screen.ReadOnlyOwnerTable"
});

screenStore.registerScreen("read-only-owner-list", {
  component: ReadOnlyOwnerList,
  captionKey: "screen.ReadOnlyOwnerList"
});

screenStore.registerScreen("standalone-owner-cards", {
  component: StandaloneOwnerCards,
  captionKey: "screen.StandaloneOwnerCards"
});

screenStore.registerScreen("standalone-owner-table", {
  component: StandaloneOwnerTable,
  captionKey: "screen.StandaloneOwnerTable"
});

screenStore.registerScreen("standalone-owner-list", {
  component: StandaloneOwnerList,
  captionKey: "screen.StandaloneOwnerList"
});

screenStore.registerScreen("standalone-owner-editor", {
  component: StandaloneOwnerEditor,
  captionKey: "screen.StandaloneOwnerEditor"
});

screenStore.registerScreen("owner-lookup-cards", {
  component: OwnerLookup,
  captionKey: "screen.OwnerLookup"
});

screenStore.registerScreen("pet-lookup-cards", {
  component: PetLookup,
  captionKey: "screen.PetLookup"
});

screenStore.registerScreen("pet-type-lookup-cards", {
  component: PetTypeLookup,
  captionKey: "screen.PetTypeLookup"
});
