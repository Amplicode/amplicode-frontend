const {petDiseaseListQuery} = require("../bootstrap-app/queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../common");

const answers = btoa(JSON.stringify({
  componentName: 'PetDiseaseLookup',
  route: 'pet-disease-lookup-cards',
  shouldAddToMenu: true,
  query: esc(petDiseaseListQuery),
}));

const command = `node ${amplicodegen} react-typescript:entity-lookup`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/lookup`
+ ` --dirShift ../../../`;

runCmdSync(command);
