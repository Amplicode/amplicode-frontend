const {STANDALONE_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {scalarsListQuery, scalarsDeleteMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneScalarsCards',
  route: 'standalone-scalars-cards',
  shouldAddToMenu: true,
  query: esc(scalarsListQuery),
  mutation: esc(scalarsDeleteMutation),
  mode: 'edit'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-list`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
