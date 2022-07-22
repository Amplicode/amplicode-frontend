const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListByNamesFilterOffsetPageSorted, ownerDetailsQuery, ownerDeleteMutation, ownerUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'OwnerListWithFilterSortPage',
  itemComponentName: 'OwnerListsWithFilterSortPageEditor',
  route: 'owner-list-with-filter-sort-page',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(ownerListByNamesFilterOffsetPageSorted),
  itemQuery: esc(ownerDetailsQuery),
  deleteMutation: esc(ownerDeleteMutation),
  upsertMutation: esc(ownerUpsertMutation),
  filterByArguments: [['filter', 'firstName'], ['filter', 'lastName']],
  orderByArguments: [
    {property: 'CITY', direction: 'DESC'},
    {property: 'CITY', direction: 'ASC'},
    {property: 'FIRST_NAME', direction: 'DESC'},
    {property: 'FIRST_NAME', direction: 'ASC'},
  ],
  paginationType: 'offset'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
