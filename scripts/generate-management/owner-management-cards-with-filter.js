const { runCmdSync, esc, btoa, amplicodegen } = require("../common");
const {ownerListQueryWithFilter, ownerDetailsQuery, ownerDeleteMutation, ownerUpsertMutation} = require("../bootstrap-app/queries");

const ownerManagementAnswers = btoa(JSON.stringify({
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

const ownerManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${ownerManagementAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/owner`
+ ` --dirShift ../../../`;

runCmdSync(ownerManagementCommand);
