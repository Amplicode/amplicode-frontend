const { runCmdSync, esc, btoa, amplicodegen } = require("../common");

const ownerListQuery = `query Get_Owner_List {
    ownerList {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }`;

const ownerDeleteMutation = `mutation Delete_Owner($id: BigInteger!) {
    delete_Owner(id: $id)
  }`;

const standaloneListAnswers = btoa(JSON.stringify({
  componentName: 'StandaloneOwnerCards',
  route: 'standalone-owner-cards',
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
