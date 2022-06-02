const {STANDALONE_EDITOR_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {scalarsDetailsQuery, scalarsUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandaloneScalarsEditor',
  refetchQueryName: 'Get_Scalars_List',
  route: 'standalone-scalars-editor',
  shouldAddToMenu: true,
  query: esc(scalarsDetailsQuery),
  mutation: esc(scalarsUpsertMutation),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_EDITOR_DIR}`
  + ` --dirShift ../../../`);
