const { runCmdSync, esc, btoa, amplicodegen } = require("../common");
const {petDiseaseDetailsQuery, petDiseaseUpsertMutation} = require("../bootstrap-app/queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandalonePetDiseaseEditor',
  refetchQueryName: 'Get_Pet_Disease_List',
  route: 'standalone-pet-disease-editor',
  shouldAddToMenu: true,
  query: esc(petDiseaseDetailsQuery),
  mutation: esc(petDiseaseUpsertMutation),
  addToMenu: true,
  idField: 'petDiseaseIdentifier'
}));

const command = `node ${amplicodegen} react-typescript:entity-details`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/standalone-pet-disease-editor`
+ ` --dirShift ../../../`;

runCmdSync(command);
