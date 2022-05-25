const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petDiseaseListQuery, petDiseaseDetailsQuery, petDiseaseDeleteMutation, petDiseaseUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'PetDiseaseTable',
  itemComponentName: 'PetDiseaseTableEditor',
  route: 'pet-disease-table',
  type: 'table',
  shouldAddToMenu: true,
  listQuery: esc(petDiseaseListQuery),
  detailsQuery: esc(petDiseaseDetailsQuery),
  deleteMutation: esc(petDiseaseDeleteMutation),
  upsertMutation: esc(petDiseaseUpsertMutation),
  listIdField: "petDiseaseIdentifier",
  detailsIdField: "petDiseaseIdentifier"
}));

const command = `node ${amplicodegen} react-typescript:entity-management`
    + ` --answers ${answers}`
    + ` --schema ./schema.graphql`
    + ` --dest ../example-app/src/app/screens/pet-disease-management`
    + ` --dirShift ../../../`;

runCmdSync(command);
