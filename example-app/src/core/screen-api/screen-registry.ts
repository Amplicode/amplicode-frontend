import { StandaloneOwnerCards } from "../../app/screens/standalone-list/StandaloneOwnerCards";
import { ReadOnlyOwnerCards } from "../../app/screens/read-only-owner/ReadOnlyOwnerCards";
import { PetCards } from "../../app/screens/pet/PetCards";
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

screenStore.registerScreen("pet-cards", {
  component: PetCards,
  captionKey: "screen.PetCards"
});

screenStore.registerScreen("read-only-owner-cards", {
  component: ReadOnlyOwnerCards,
  captionKey: "screen.ReadOnlyOwnerCards"
});

screenStore.registerScreen("standalone-owner-cards", {
  component: StandaloneOwnerCards,
  captionKey: "screen.StandaloneOwnerCards"
});
