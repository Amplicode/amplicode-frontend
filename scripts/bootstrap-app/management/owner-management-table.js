const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");
const {ownerListQuery, ownerDetailsQuery, ownerDeleteMutation, ownerUpsertMutation} = require("../queries");

const answers = btoa(JSON.stringify({
    listComponentName: 'OwnerTable',
    itemComponentName: 'OwnerTableEditor',
    route: 'owner-table',
    type: 'table',
    shouldAddToMenu: true,
    listQuery: esc(ownerListQuery),
    detailsQuery: esc(ownerDetailsQuery),
    deleteMutation: esc(ownerDeleteMutation),
    upsertMutation: esc(ownerUpsertMutation),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
