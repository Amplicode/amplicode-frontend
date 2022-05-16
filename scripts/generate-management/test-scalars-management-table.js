const { runCmdSync, esc, btoa, amplicodegen } = require("../common");
const {scalarsListQuery, scalarsDetailsQuery, scalarsDeleteMutation, scalarsUpsertMutation} = require("../bootstrap-app/queries");

const scalarsManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'TestScalarsTable',
  itemComponentName: 'TestScalarsTableEditor',
  route: 'scalars-table',
  type: 'table',
  shouldAddToMenu: true,
  listQuery: esc(scalarsListQuery),
  detailsQuery: esc(scalarsDetailsQuery),
  deleteMutation: esc(scalarsDeleteMutation),
  upsertMutation: esc(scalarsUpsertMutation),
}));

const scalarsManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${scalarsManagementAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/scalars`
+ ` --dirShift ../../../`;

runCmdSync(scalarsManagementCommand);
