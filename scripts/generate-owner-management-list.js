const { runCmdSync, esc, btoa, amplicodegen } = require("./common");

const ownerListQuery = `
query Get_Owner_List {
  ownerList {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}
`;

const ownerDeleteMutation = `
mutation Delete_Owner($id: BigInteger) {
  delete_Owner(id: $id)
}
`;

const ownerDetailsQuery = `
query Get_Owner($id: BigInteger) {
  owner(id: $id) {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}
`;

const ownerUpsertMutation = `
mutation Update_Owner($input: OwnerInputDTOInput) {
  update_Owner(input: $input) {
    id
  }
}
`;

const ownerManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'OwnerList',
  itemComponentName: 'OwnerListEditor',
  route: 'owner-list',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQuery),
  detailsQuery: esc(ownerDetailsQuery),
  deleteMutation: esc(ownerDeleteMutation),
  upsertMutation: esc(ownerUpsertMutation),
}));

const ownerManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${ownerManagementAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/owner`
+ ` --dirShift ../../../`;

runCmdSync(ownerManagementCommand);
