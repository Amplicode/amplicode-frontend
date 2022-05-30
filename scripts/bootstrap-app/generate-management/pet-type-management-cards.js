const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petTypeListQuery, petTypeDetailsQuery, petTypeDeleteMutation, petTypeUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'PetTypeCards',
  itemComponentName: 'PetTypeCardsEditor',
  route: 'pet-type-cards',
  shouldAddToMenu: true,
  listQuery: esc(petTypeListQuery),
  detailsQuery: esc(petTypeDetailsQuery),
  deleteMutation: esc(petTypeDeleteMutation),
  upsertMutation: esc(petTypeUpsertMutation),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql ./defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
