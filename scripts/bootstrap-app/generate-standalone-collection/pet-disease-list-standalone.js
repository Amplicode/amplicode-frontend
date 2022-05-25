const {STANDALONE_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petDiseaseListQuery, petDiseaseDeleteMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandalonePetDiseaseList',
  route: 'standalone-pet-disease-list',
  type: 'list',
  shouldAddToMenu: true,
  query: esc(petDiseaseListQuery),
  mutation: esc(petDiseaseDeleteMutation),
  mode: 'edit',
  idField: 'petDiseaseIdentifier'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-list`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
