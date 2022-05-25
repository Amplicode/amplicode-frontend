const {STANDALONE_DETAILS_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petDetailsQuery} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandalonePetDetails',
  route: 'standalone-pet-details',
  shouldAddToMenu: true,
  query: esc(petDetailsQuery),
  addToMenu: true,
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_DETAILS_DIR}`
  + ` --dirShift ../../../`);
