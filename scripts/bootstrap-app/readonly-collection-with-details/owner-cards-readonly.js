const {READONLY_COLLECTION_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListQuery, ownerDetailsQuery} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'ReadOnlyOwnerCards',
  itemComponentName: 'ReadOnlyOwnerCardsDetails',
  route: 'read-only-owner-cards',
  shouldAddToMenu: true,
  listQuery: esc(ownerListQuery),
  itemQuery: esc(ownerDetailsQuery),
  mode: 'view with details'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${READONLY_COLLECTION_DIR}`
  + ` --dirShift ../../../`);
