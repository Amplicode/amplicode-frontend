const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petListQueryWithFilter, petDetailsQuery, petDeleteMutation, petUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
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

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
