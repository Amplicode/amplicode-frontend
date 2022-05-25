const {petDiseaseListQuery, petDiseaseDetailsQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyPetDiseaseList',
  itemComponentName: 'ReadOnlyPetDiseaseListDetails',
  route: 'read-only-pet-disease-list',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(petDiseaseListQuery),
  detailsQuery: esc(petDiseaseDetailsQuery),
  mode: 'view with details',
  listIdField: 'petDiseaseIdentifier',
  detailsIdField: 'petDiseaseIdentifier'
}));

const command = `node ${amplicodegen} react-typescript:entity-management`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/read-only-pet-disease`
+ ` --dirShift ../../../`;

runCmdSync(command);
