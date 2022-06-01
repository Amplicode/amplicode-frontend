const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListQueryWithFilter, ownerDetailsQuery, ownerDeleteMutation, ownerUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'OwnerCardsWithFilter',
  itemComponentName: 'OwnerCardsWithFilterEditor',
  route: 'owner-cards-with-filter',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQueryWithFilter),
  detailsQuery: esc(ownerDetailsQuery),
  deleteMutation: esc(ownerDeleteMutation),
  upsertMutation: esc(ownerUpsertMutation),
  filterByArguments: [['filter', 'firstName'], ['filter', 'lastName']]
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql ./defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
