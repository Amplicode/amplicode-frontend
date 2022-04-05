const {petListQuery, petDetailsQuery} = require("../bootstrap-app/queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyPetList',
  itemComponentName: 'ReadOnlyPetListDetails',
  route: 'read-only-pet-list',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(petListQuery),
  detailsQuery: esc(petDetailsQuery),
  mode: 'view with details'
}));

const readOnlyManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/read-only-pet`
+ ` --dirShift ../../../`;

runCmdSync(readOnlyManagementCommand);
