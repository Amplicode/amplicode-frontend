const {STANDALONE_DETAILS_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerDetailsQuery} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneOwnerDetails',
  route: 'standalone-owner-details',
  shouldAddToMenu: true,
  query: esc(ownerDetailsQuery),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_DETAILS_DIR}`
  + ` --dirShift ../../../`);
