const {READONLY_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListByNamesFilterOffsetPageSorted, ownerDetailsQuery} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyOwnerTableWithFilterSortPage',
  itemComponentName: 'ReadOnlyOwnerTableWithFilterSortPageDetails',
  route: 'read-only-owner-table-with-filter-sort-page',
  type: 'table',
  shouldAddToMenu: true,
  listQuery: esc(ownerListByNamesFilterOffsetPageSorted),
  detailsQuery: esc(ownerDetailsQuery),
  filterByArguments: [['filter', 'firstName'], ['filter', 'lastName']],
  orderByArguments: [
    'CITY',
    'FIRST_NAME',
  ],
  paginationType: 'offset',
  mode: 'view with details'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${READONLY_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
