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

const ownerDetailsQuery = `query Get_Owner($id: BigInteger) {
    owner(id: $id) {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }`;

const readOnlyManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyOwnerCards',
  itemComponentName: 'ReadOnlyOwnerCardsDetails',
  route: 'read-only-owner-cards',
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
