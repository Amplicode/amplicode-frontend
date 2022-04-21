const { runCmdSync, esc, btoa, amplicodegen } = require("../common");
const {petListQueryWithFilter, petDetailsQuery, petDeleteMutation, petUpsertMutation} = require("../bootstrap-app/queries");

const petManagementAnswers = btoa(JSON.stringify({
  listComponentName: 'PetTable',
  itemComponentName: 'PetTableEditor',
  route: 'pet-table',
  type: 'table',
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
