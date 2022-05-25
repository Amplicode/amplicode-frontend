const {petListQueryWithFilter, petDetailsQuery, petDeleteMutation, petUpsertMutation} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const petManagementAnswers = btoa(JSON.stringify({
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

const petManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
    + ` --answers ${petManagementAnswers}`
    + ` --schema ./schema.graphql`
    + ` --dest ../example-app/src/app/screens/pet`
    + ` --dirShift ../../../`;

runCmdSync(petManagementCommand);
