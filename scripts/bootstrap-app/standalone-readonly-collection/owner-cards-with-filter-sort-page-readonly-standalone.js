const {READONLY_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListByNamesFilterOffsetPageSorted} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneReadOnlyOwnerCardsWithFilterSortPage',
  route: 'standalone-read-only-owner-cards-with-filter-sort-page',
  type: 'cards',
  shouldAddToMenu: true,
  query: esc(ownerListByNamesFilterOffsetPageSorted),
  filterByArguments: [['filter', 'firstName'], ['filter', 'lastName']],
  orderByArguments: [
    'CITY',
    'FIRST_NAME',
  ],
  paginationType: 'offset',
  mode: 'view'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-list`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${READONLY_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
