const {MANAGEMENT_DIR} = require("../config");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const visitListQueryWithFilter = `query Get_Visit_List_With_Filter($filter: VisitFilterInput) {
  visitFilteredList(filter: $filter) {
    description
    id
    pet {
      id
      identificationNumber
      birthDate
      type {
        id
        name
      }
      owner {
        id
        firstName
        lastName
      }
    }
    visitEnd
    visitStart
  }
}`;

const visitDeleteMutation = `mutation Delete_Visit($id: ID!) {
  deleteVisit(id: $id)
}`;

const visitDetailsQuery = `query Get_Visit($id: ID) {
  visit(id: $id) {
    description
    id
    pet {
      id
      identificationNumber
      birthDate
      type {
        id
        name
      }
      owner {
        id
        firstName
        lastName
      }
    }
    visitEnd
    visitStart
  }
}`;

const visitUpsertMutation = `mutation Update_Visit($input: VisitInputDTO) {
  updateVisit(input: $input) {
    id
  }
}`;


const answers = btoa(JSON.stringify({
  listComponentName: 'VisitWithFilter',
  itemComponentName: 'VisitWithFilterEditor',
  route: 'visit-with-filter',
  shouldAddToMenu: true,
  listQuery: esc(visitListQueryWithFilter),
  itemQuery: esc(visitDetailsQuery),
  deleteMutation: esc(visitDeleteMutation),
  upsertMutation: esc(visitUpsertMutation),
  filterByArguments: [
    ['filter', 'ownerFirstName'],
    ['filter', 'ownerLastName'],
    ['filter', 'visitStartAfter'],
    ['filter', 'visitStartBefore'],
    ['filter', 'petIdentificationNumber'],
  ]
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);
