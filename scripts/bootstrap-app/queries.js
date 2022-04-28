/* Scalars */

exports.scalarsListQuery = `query Get_Scalars_List {
    scalarsTestEntityList {
      id
      intTest
      floatTest
      string
      bool
      bigInt
      longTest
      bigDecimal
    }
  }`;

exports.scalarsDeleteMutation = `mutation Delete_Scalars($id: ID!) {
    deleteScalarsTestEntity(id: $id)
  }`;

exports.scalarsDetailsQuery = `query Get_Scalars($id: ID) {
    scalarsTestEntity(id: $id) {
      id
      intTest
      floatTest
      string
      bool
      bigInt
      longTest
      bigDecimal
    }
  }`;

exports.scalarsUpsertMutation = `mutation Update_Scalars($input: ScalarsTestEntityInput) {
    updateScalarsTestEntity(input: $input) {
      id
    }
  }`;

/* Owner */

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

/* Pet */

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

exports.petListQueryWithFilter = `query Get_Pet_List_With_Filter($identificationNumber: String) {
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


