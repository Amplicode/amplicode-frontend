import {transformAddRouteImport, transformAddRouteItem, transformAddMenuItem} from "./addMvpAppMenu";
import {expect} from "chai";

describe('transformAddRouteItem', () => {
  it('adds a route item successfully', () => {
    const result = transformAddRouteItem(ADD_ROUTE_ITEM_INPUT, 'pet-list', 'PetList');
    expect(result).to.be.eq(ADD_ROUTE_ITEM_EXPECTED);
  });
});

const ADD_ROUTE_ITEM_INPUT = `
export function AppRoutes() {
  return (
    <Routes>
    </Routes>
  );
}`;
const ADD_ROUTE_ITEM_EXPECTED = `
export function AppRoutes() {
  return (
    (<Routes>
      <Route path="pet-list">
            <Route index element={<PetList/>} />
            <Route path=":recordId" element={<PetList/>} />
          </Route></Routes>)
  );
}`;

describe('transformAddRouteImport', () => {
  it('adds an import successfully', () => {
    const result = transformAddRouteImport(ADD_ROUTE_IMPORTS_INPUT, 'PetList', './pet-list/PetList');
    expect(result).to.be.eq(ADD_ROUTE_IMPORTS_EXPECTED);
  });
});

const ADD_ROUTE_IMPORTS_INPUT = `
import { Home } from "./home/Home";
import { ReactComponent } from "../framework/screen-api/ReactComponent";`;
const ADD_ROUTE_IMPORTS_EXPECTED = `
import { PetList } from "./pet-list/PetList";
import { Home } from "./home/Home";
import { ReactComponent } from "../framework/screen-api/ReactComponent";`;


describe('transformAddMenuItem', () => {
  it('adds a menu item successfully', () => {
    const result = transformAddMenuItem(ADD_MENU_ITEM_INPUT, "pet-list", 'PetListScreenLayout');
    expect(result).to.be.eq(ADD_MENU_ITEM_EXPECTED);
  });
});

const ADD_MENU_ITEM_INPUT = `
const menuItems: ItemType[] = [];`;
const ADD_MENU_ITEM_EXPECTED = `
const menuItems: ItemType[] = [{
  label: (
    <Link to="pet-list">
      <FormattedMessage id="screen.PetListScreenLayout" />
    </Link>
  ),
  key: "pet-list"
}];`;
