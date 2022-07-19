const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {petTypeListQuery, petTypeDetailsQuery, petTypeDeleteMutation, petTypeUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
  listComponentName: 'PetTypeTable',
  itemComponentName: 'PetTypeTableEditor',
  route: 'pet-type-table',
  type: 'table',
  shouldAddToMenu: true,
  listQuery: esc(petTypeListQuery),
  detailsQuery: esc(petTypeDetailsQuery),
  deleteMutation: esc(petTypeDeleteMutation),
  upsertMutation: esc(petTypeUpsertMutation)
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
