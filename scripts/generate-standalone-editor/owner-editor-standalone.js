const { runCmdSync, esc, btoa, amplicodegen } = require("../common");

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

const ownerUpsertMutation = `mutation Update_Owner($input: OwnerInputDTOInput) {
    update_Owner(input: $input) {
      id
    }
  }`;

const ownerEditorAnswers = btoa(JSON.stringify({
  componentName: 'StandaloneOwnerEditor',
  refetchQueryName: 'Get_Owner_List',
  route: 'standalone-owner-editor',
  shouldAddToMenu: true,
  query: esc(ownerDetailsQuery),
  mutation: esc(ownerUpsertMutation),
  addToMenu: true,
}));

const ownerEditorCommand = `node ${amplicodegen} react-typescript:entity-details`
+ ` --answers ${ownerEditorAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/owner`
+ ` --dirShift ../../../`;

runCmdSync(ownerEditorCommand);
