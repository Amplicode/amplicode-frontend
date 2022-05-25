const {STANDALONE_EDITOR_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerDetailsQuery, ownerUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneOwnerEditor',
  refetchQueryName: 'Get_Owner_List',
  route: 'standalone-owner-editor',
  shouldAddToMenu: true,
  query: esc(ownerDetailsQuery),
  mutation: esc(ownerUpsertMutation),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_EDITOR_DIR}`
  + ` --dirShift ../../../`);
