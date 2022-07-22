const {MANAGEMENT_DIR} = require("../config");
const {notNullScalarsListQuery, notNullScalarsDetailsQuery, notNullScalarsDeleteMutation, notNullScalarsUpsertMutation} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'ScalarsNotNullCards',
  itemComponentName: 'ScalarsNotNullCardsEditor',
  route: 'scalars-notnull-cards',
  shouldAddToMenu: true,
  listQuery: esc(notNullScalarsListQuery),
  itemQuery: esc(notNullScalarsDetailsQuery),
  deleteMutation: esc(notNullScalarsDeleteMutation),
  upsertMutation: esc(notNullScalarsUpsertMutation),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
