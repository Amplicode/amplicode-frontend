const { runCmdSync, esc, btoa, amplicodegen } = require("../common");
const {petDiseaseListQuery, petDiseaseDeleteMutation} = require("../bootstrap-app/queries");

const standaloneListAnswers = btoa(JSON.stringify({
  componentName: 'StandalonePetDiseaseList',
  route: 'standalone-pet-disease-list',
  type: 'list',
  shouldAddToMenu: true,
  query: esc(petDiseaseListQuery),
  mutation: esc(petDiseaseDeleteMutation),
  mode: 'edit',
  idField: 'petDiseaseIdentifier'
}));

const standaloneListCommand = `node ${amplicodegen} react-typescript:entity-list`
+ ` --answers ${standaloneListAnswers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/standalone-pet-disease-list`
+ ` --dirShift ../../../`;

runCmdSync(standaloneListCommand);
