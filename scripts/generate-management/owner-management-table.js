const { runCmdSync, esc, btoa, amplicodegen } = require("../common");
const {ownerListQuery, ownerDetailsQuery, ownerDeleteMutation, ownerUpsertMutation} = require("../bootstrap-app/queries");

const ownerManagementAnswers = btoa(JSON.stringify({
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

const ownerManagementCommand = `node ${amplicodegen} react-typescript:entity-management`
    + ` --answers ${ownerManagementAnswers}`
    + ` --schema ./schema.graphql`
    + ` --dest ../example-app/src/app/screens/owner`
    + ` --dirShift ../../../`;

runCmdSync(ownerManagementCommand);
