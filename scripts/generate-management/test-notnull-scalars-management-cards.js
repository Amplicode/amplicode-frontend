const {notNullScalarsListQuery, notNullScalarsDetailsQuery, notNullScalarsDeleteMutation, notNullScalarsUpsertMutation} = require("../bootstrap-app/queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'TestNotNullScalarsCards',
  itemComponentName: 'TestNotNullScalarsCardsEditor',
  route: 'notnull-scalars-cards',
  shouldAddToMenu: true,
  listQuery: esc(notNullScalarsListQuery),
  detailsQuery: esc(notNullScalarsDetailsQuery),
  deleteMutation: esc(notNullScalarsDeleteMutation),
  upsertMutation: esc(notNullScalarsUpsertMutation),
}));

const command = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/notnull-scalars`
+ ` --dirShift ../../../`;

runCmdSync(command);
