const {MANAGEMENT_DIR} = require("../config");
const {notNullScalarsListQuery, notNullScalarsDetailsQuery, notNullScalarsDeleteMutation, notNullScalarsUpsertMutation} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

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

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql ./defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
