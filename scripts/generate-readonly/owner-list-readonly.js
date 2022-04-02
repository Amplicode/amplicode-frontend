const { runCmdSync, esc, btoa, amplicodegen } = require("../common");
const {ownerListQuery, ownerDetailsQuery} = require("../bootstrap-app/queries");

const readOnlyManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyOwnerList',
  itemComponentName: 'ReadOnlyOwnerListDetails',
  route: 'read-only-owner-list',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQuery),
  detailsQuery: esc(ownerDetailsQuery),
  mode: 'view with details'
}));

const readOnlyManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${readOnlyManagementAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/read-only-owner`
+ ` --dirShift ../../../`;

runCmdSync(readOnlyManagementCommand);
