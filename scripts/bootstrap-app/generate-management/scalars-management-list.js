const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {scalarsListQuery, scalarsDetailsQuery, scalarsDeleteMutation, scalarsUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'ScalarsList',
  itemComponentName: 'ScalarsListEditor',
  route: 'scalars-list',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(scalarsListQuery),
  detailsQuery: esc(scalarsDetailsQuery),
  deleteMutation: esc(scalarsDeleteMutation),
  upsertMutation: esc(scalarsUpsertMutation),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
