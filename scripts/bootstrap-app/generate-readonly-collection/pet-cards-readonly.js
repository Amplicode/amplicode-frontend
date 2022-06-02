const {READONLY_COLLECTION_DIR} = require("../config");
const {petListQuery, petDetailsQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyPetCards',
  itemComponentName: 'ReadOnlyPetCardsDetails',
  route: 'read-only-pet-cards',
  shouldAddToMenu: true,
  listQuery: esc(petListQuery),
  detailsQuery: esc(petDetailsQuery),
  mode: 'view with details',
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${READONLY_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
