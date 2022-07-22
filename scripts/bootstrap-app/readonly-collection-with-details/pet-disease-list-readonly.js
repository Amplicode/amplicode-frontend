const {READONLY_COLLECTION_DIR} = require("../config");
const {petDiseaseListQuery, petDiseaseDetailsQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyPetDiseaseList',
  itemComponentName: 'ReadOnlyPetDiseaseListDetails',
  route: 'read-only-pet-disease-list',
  type: 'list',
  shouldAddToMenu: true,
  listQuery: esc(petDiseaseListQuery),
  itemQuery: esc(petDiseaseDetailsQuery),
  mode: 'view with details',
  listIdField: 'petDiseaseIdentifier',
  detailsIdField: 'petDiseaseIdentifier'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${READONLY_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
