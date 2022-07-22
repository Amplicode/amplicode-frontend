const {STANDALONE_EDITOR_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petDiseaseDetailsQuery, petDiseaseUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  componentName: 'StandalonePetDiseaseEditor',
  refetchQueryName: 'Get_Pet_Disease_List',
  route: 'standalone-pet-disease-editor',
  shouldAddToMenu: true,
  itemQuery: esc(petDiseaseDetailsQuery),
  upsertMutation: esc(petDiseaseUpsertMutation),
  idField: 'petDiseaseIdentifier'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-details`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${STANDALONE_EDITOR_DIR}`
  + ` --dirShift ../../../`);
