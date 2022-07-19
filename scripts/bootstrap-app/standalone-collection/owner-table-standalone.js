const {STANDALONE_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListQuery, ownerDeleteMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneOwnerTable',
  route: 'standalone-owner-table',
  type: 'table',
  shouldAddToMenu: true,
  query: esc(ownerListQuery),
  mutation: esc(ownerDeleteMutation),
  mode: 'edit'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-list`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
