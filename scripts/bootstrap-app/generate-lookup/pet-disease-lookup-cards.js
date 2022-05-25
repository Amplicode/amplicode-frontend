const {LOOKUP_SCREENS_DIR} = require("../config");
const {petDiseaseListQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  componentName: 'PetDiseaseLookupCards',
  route: 'pet-disease-lookup-cards',
  shouldAddToMenu: true,
  query: esc(petDiseaseListQuery),
  idField: 'petDiseaseIdentifier'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-lookup`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${LOOKUP_SCREENS_DIR}`
  + ` --dirShift ../../../`);
