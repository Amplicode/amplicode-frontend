const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListByNamesFilterOffsetPageSorted, ownerDetailsQuery, ownerDeleteMutation, ownerUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'OwnerCardsWithFilterSortPage',
  itemComponentName: 'OwnerCardsWithFilterSortPageEditor',
  route: 'owner-cards-with-filter-sort-page',
  shouldAddToMenu: true,
  listQuery: esc(ownerListByNamesFilterOffsetPageSorted),
  detailsQuery: esc(ownerDetailsQuery),
  deleteMutation: esc(ownerDeleteMutation),
  upsertMutation: esc(ownerUpsertMutation),
  filterByArguments: [['filter', 'firstName'], ['filter', 'lastName']],
  orderByArguments: [['sort', 'property', 'CITY'], ['sort', 'property', 'FIRST_NAME']],
  paginationArgument: ['page']
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
