const {STANDALONE_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListQuery, ownerDeleteMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneOwnerCards',
  route: 'standalone-owner-cards',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQuery),
  deleteMutation: esc(ownerDeleteMutation),
  mode: 'edit'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-list`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
