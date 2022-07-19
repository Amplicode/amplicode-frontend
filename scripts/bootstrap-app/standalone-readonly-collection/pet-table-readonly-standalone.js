const {STANDALONE_READONLY_COLLECTION_DIR} = require("../config");
const {petListQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneReadOnlyPetTable',
  route: 'standalone-read-only-pet-table',
  type: 'table',
  shouldAddToMenu: true,
  query: esc(petListQuery),
  mode: 'view',
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-list`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_READONLY_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
