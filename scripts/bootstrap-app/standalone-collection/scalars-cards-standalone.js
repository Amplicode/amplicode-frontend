const {STANDALONE_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {scalarsListQuery, scalarsDeleteMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneScalarsCards',
  route: 'standalone-scalars-cards',
  shouldAddToMenu: true,
  listQuery: esc(scalarsListQuery),
  deleteMutation: esc(scalarsDeleteMutation),
  mode: 'edit'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-list`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
