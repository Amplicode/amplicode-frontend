const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListQuery, ownerDeleteMutation} = require("../queries");

const standaloneListAnswers = btoa(JSON.stringify({
  componentName: 'StandaloneOwnerList',
  route: 'standalone-owner-list',
  type: 'list',
  shouldAddToMenu: true,
  query: esc(ownerListQuery),
  mutation: esc(ownerDeleteMutation),
  mode: 'edit'
}));

const standaloneListCommand = `node ${amplicodegen} react-typescript:entity-list`
+ ` --answers ${standaloneListAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/standalone-list`
+ ` --dirShift ../../../`;

runCmdSync(standaloneListCommand);
