import { StandaloneOwnerList } from "../../app/screens/standalone-list/StandaloneOwnerList";
import { ReadOnlyOwnerList } from "../../app/screens/read-only-owner/ReadOnlyOwnerList";
import { PetList } from "../../app/screens/pet/PetList";
import { OwnerList } from "../../app/screens/owner/OwnerList";
import { Home } from "../../app/screens/home/Home";
import { screenStore } from "@amplicode/react-core";

screenStore.registerScreen("home", {
  component: Home,
  captionKey: "screen.home"
});

screenStore.registerScreen("owner-list", {
  component: OwnerList,
  captionKey: "screen.OwnerList"
});

screenStore.registerScreen("pet-list", {
  component: PetList,
  captionKey: "screen.PetList"
});

screenStore.registerScreen("read-only-owner-list", {
  component: ReadOnlyOwnerList,
  captionKey: "screen.ReadOnlyOwnerList"
});

screenStore.registerScreen("standalone-owner-list", {
  component: StandaloneOwnerList,
  captionKey: "screen.StandaloneOwnerList"
});
