const {STANDALONE_DETAILS_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petDetailsQuery} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandalonePetDetails',
  route: 'standalone-pet-details',
  shouldAddToMenu: true,
  query: esc(petDetailsQuery),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql ./defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_DETAILS_DIR}`
  + ` --dirShift ../../../`);
