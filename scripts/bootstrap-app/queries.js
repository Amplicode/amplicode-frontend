exports.ownerListQuery = `query Get_Owner_List {
    ownerList {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }`;

exports.ownerListQueryWithFilter = `query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {
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

exports.ownerDeleteMutation = `mutation Delete_Owner($id: ID!) {
    deleteOwner(id: $id)
  }`;

exports.ownerDetailsQuery = `query Get_Owner($id: ID) {
    owner(id: $id) {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }`;

exports.ownerUpsertMutation = `mutation Update_Owner($input: OwnerInputDTOInput) {
    updateOwner(input: $input) {
      id
    }
  }`;


exports.petListQuery = `query Get_Pet_List {
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
  }`;

exports.petListQueryWithFilter = `query Get_New_Pet_List_With_Filter($identificationNumber: String) {
    petByIdentificationNumberList(identificationNumber: $identificationNumber) {
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
  }`;

exports.petDeleteMutation = `mutation Delete_Pet($id: ID!) {
    deletePet(id: $id)
  }`;

exports.petDetailsQuery = `query Get_Pet($id: ID) {
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
  }`;

exports.petUpsertMutation = `mutation Update_Pet($input: PetInputDTOInput) {
    updatePet(input: $input) {
      id
    }
  }`;


