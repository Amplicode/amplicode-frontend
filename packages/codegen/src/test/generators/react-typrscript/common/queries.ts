export const getOwnerQuery = `
query Get_Owner($id: BigInteger) {
  owner(id: $id) {
    id
    firstName
    lastName
    city
    address
    email
    telephone
  }
}
`;

export const ownerUpsertMutation = `
mutation Update_Owner($input: OwnerInputDTOInput) {
  update_Owner(input: $input) {
    id
  }
}
`;

export const ownerListQuery = `
query Get_Owner_List {
  ownerList {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}
`;

export const ownerListQueryWithFilter = `
query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {
  ownerByNamesList(filter: $filter) {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}`;

export const ownerDetailsQuery = `
query Get_Owner($id: BigInteger) {
  owner(id: $id) {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}
`;

export const ownerDeleteMutation = `
mutation Delete_Owner($id: BigInteger!) {
  delete_Owner(id: $id)
}
`;

export const petListQuery = `
query Get_Pet_List {
  petList {
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
}
`;

export const petDeleteMutation = `
mutation Delete_Pet($id: BigInteger!) {
  delete_Pet(id: $id)
}
`;

export const petDetailsQuery = `
query Get_Pet($id: BigInteger) {
  pet(id: $id) {
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
}
`;


