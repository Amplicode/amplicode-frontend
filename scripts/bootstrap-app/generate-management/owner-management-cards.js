const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListQuery, ownerDetailsQuery, ownerDeleteMutation, ownerUpsertMutation} = require("../queries");

const ownerManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'OwnerCards',
  itemComponentName: 'OwnerCardsEditor',
  route: 'owner-cards',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQuery),
  detailsQuery: esc(ownerDetailsQuery),
  deleteMutation: esc(ownerDeleteMutation),
  upsertMutation: esc(ownerUpsertMutation),
}));

const ownerManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${ownerManagementAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/owner`
+ ` --dirShift ../../../`;

runCmdSync(ownerManagementCommand);
