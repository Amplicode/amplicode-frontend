const {MANAGEMENT_DIR} = require("../config");
const {petListQueryWithFilter, petDetailsQuery, petDeleteMutation, petUpsertMutation} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  listComponentName: 'PetCards',
  itemComponentName: 'PetCardsEditor',
  route: 'pet-cards',
  shouldAddToMenu: true,
  listQuery: esc(petListQueryWithFilter),
  detailsQuery: esc(petDetailsQuery),
  deleteMutation: esc(petDeleteMutation),
  upsertMutation: esc(petUpsertMutation),
  filterByArguments: [['identificationNumber']],
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
