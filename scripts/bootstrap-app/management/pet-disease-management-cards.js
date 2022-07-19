const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petDiseaseListQuery, petDiseaseDetailsQuery, petDiseaseDeleteMutation, petDiseaseUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'PetDiseaseCards',
  itemComponentName: 'PetDiseaseCardsEditor',
  route: 'pet-disease-cards',
  type: 'cards',
  shouldAddToMenu: true,
  listQuery: esc(petDiseaseListQuery),
  detailsQuery: esc(petDiseaseDetailsQuery),
  deleteMutation: esc(petDiseaseDeleteMutation),
  upsertMutation: esc(petDiseaseUpsertMutation),
  listIdField: "petDiseaseIdentifier",
  detailsIdField: "petDiseaseIdentifier"
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
