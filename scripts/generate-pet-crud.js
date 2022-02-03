const { runCmdSync, esc, btoa, amplicodegen } = require("./common");

const petListQuery = `
query Get_Pet_List {
  petList {
     id
     identificationNumber
     owner {
       firstName
       lastName
     }
  }
}
`;

const petDeleteMutation = `
mutation Delete_Pet($id: BigInteger!) {
  delete_Pet(id: $id)
}
`;

const petDetailsQuery = `
query Get_Pet($id: BigInteger) {
  pet(id: $id) {
    id
    identificationNumber
    owner {
      firstName
      lastName
    }
  }
}
`;

const petUpsertMutation = `
mutation Update_Pet($input: PetInputDTOInput) {
  update_Pet(input: $input) {
    id
  }
}
`;

const petManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'PetList',
  itemComponentName: 'PetEditor',
  shouldAddToMenu: true,
  listQuery: esc(petListQuery),
  detailsQuery: esc(petDetailsQuery),
  deleteMutation: esc(petDeleteMutation),
  upsertMutation: esc(petUpsertMutation),
}));

const petManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
    + ` --answers ${petManagementAnswers}`
    + ` --schema ./schema.graphql`
    + ` --dest ../example-app/src/app/screens/pet`
    + ` --dirShift ../../../`;

runCmdSync(petManagementCommand);
