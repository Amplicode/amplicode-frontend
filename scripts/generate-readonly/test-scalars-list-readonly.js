const {scalarsListQuery, scalarsDetailsQuery} = require("../bootstrap-app/queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyScalarsList',
  itemComponentName: 'ReadOnlyScalarsListDetails',
  route: 'read-only-scalars-list',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(scalarsListQuery),
  detailsQuery: esc(scalarsDetailsQuery),
  mode: 'view with details',
}));

const readOnlyManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/read-only-scalars`
+ ` --dirShift ../../../`;

runCmdSync(readOnlyManagementCommand);
