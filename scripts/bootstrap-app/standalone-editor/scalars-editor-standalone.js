const {STANDALONE_EDITOR_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {scalarsDetailsQuery, scalarsUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneScalarsEditor',
  refetchQueryName: 'Get_Scalars_List',
  route: 'standalone-scalars-editor',
  shouldAddToMenu: true,
  itemQuery: esc(scalarsDetailsQuery),
  upsertMutation: esc(scalarsUpsertMutation),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_EDITOR_DIR}`
  + ` --dirShift ../../../`);
