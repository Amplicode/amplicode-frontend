const {STANDALONE_DETAILS_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {scalarsDetailsQuery} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneScalarsDetails',
  route: 'standalone-scalars-details',
  shouldAddToMenu: true,
  itemQuery: esc(scalarsDetailsQuery),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_DETAILS_DIR}`
  + ` --dirShift ../../../`);
