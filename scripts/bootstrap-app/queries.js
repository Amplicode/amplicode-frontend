/* Scalars */

exports.scalarsListQuery = `query Get_Scalars_List {
    scalarsTestEntityList {
      id
      intTest
      intPrimitive
      byteTest
      bytePrimitive
      shortTest
      shortPrimitive
      doubleTest
      doublePrimitive
      floatTest
      floatPrimitive
      string
      bool
      boolPrimitive
      bigInt
      longTest
      longPrimitive
      bigDecimal
      localDate
      localDateTime
      localTime
      offsetDateTime
      offsetTime
      dateTest
      url
    }
  }`;

exports.scalarsDeleteMutation = `mutation Delete_Scalars($id: ID!) {
    deleteScalarsTestEntity(id: $id)
  }`;

exports.scalarsDetailsQuery = `query Get_Scalars($id: ID) {
    scalarsTestEntity(id: $id) {
      id
      intTest
      intPrimitive
      byteTest
      bytePrimitive
      shortTest
      shortPrimitive
      doubleTest
      doublePrimitive
      floatTest
      floatPrimitive
      string
      bool
      boolPrimitive
      bigInt
      longTest
      longPrimitive
      bigDecimal
      localDate
      localDateTime
      localTime
      offsetDateTime
      offsetTime
      dateTest
      url
    }
  }`;

exports.scalarsUpsertMutation = `mutation Update_Scalars($input: ScalarsTestEntityInput) {
    updateScalarsTestEntity(input: $input) {
      id
    }
  }`;

exports.notNullScalarsListQuery = `query Get_NN_Scalars_List {
    notNullScalarsTestEntityList {
      id
      bigDecimalNotNull
      bigIntNotNull
      dateTestNotNull
      localDateNotNull
      localDateTimeNotNull
      localTimeNotNull
      offsetDateTimeNotNull
      offsetTimeNotNull
      stringNotNull
      urlNotNull
    }
  }`;

exports.notNullScalarsDeleteMutation = `mutation Delete_NN_Scalars($id: ID!) {
    deleteNotNullScalarsTestEntity(id: $id)
  }`;

exports.notNullScalarsDetailsQuery = `query Get_NN_Scalars($id: ID) {
    notNullScalarsTestEntity(id: $id) {
      id
      bigDecimalNotNull
      bigIntNotNull
      dateTestNotNull
      localDateNotNull
      localDateTimeNotNull
      localTimeNotNull
      offsetDateTimeNotNull
      offsetTimeNotNull
      stringNotNull
      urlNotNull
    }
  }`;

exports.notNullScalarsUpsertMutation = `mutation Update_NN_Scalars($input: NotNullScalarsTestEntityInput) {
    updateNotNullScalarsTestEntity(input: $input) {
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

exports.ownerUpsertMutation = `mutation Update_Owner($input: OwnerInputDTO) {
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
      description {
        identifier
        description
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
      description {
        identifier
        description
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
      description {
        identifier
        description
      }
    }
  }`;

exports.petUpsertMutation = `mutation Update_Pet($input: PetInputDTO) {
    updatePet(input: $input) {
      id
    }
  }`;

/* Pet Disease */

exports.petDiseaseListQuery = `query Get_Pet_Disease_List {
    petDiseaseList {
      description
      name
      petDiseaseIdentifier
    }
  }`;

exports.petDiseaseDeleteMutation = `mutation Delete_Pet_Disease($id: ID!) {
    deletePetDisease(petDiseaseIdentifier: $id)
  }`;

exports.petDiseaseDetailsQuery = `query Get_Pet_Disease($id: ID) {
    petDisease(petDiseaseIdentifier: $id) {
      description
      name
      petDiseaseIdentifier
    }
  }`;

exports.petDiseaseUpsertMutation = `mutation Update_Pet_Disease($input: PetDiseaseInputDTO) {
    updatePetDisease(input: $input) {
      petDiseaseIdentifier
    }
  }`;

/* Pet Type */

exports.petTypeListQuery = `query Get_Pet_Type_List {
    petTypeList {
      id, 
      name
    }
  }`;

  exports.petTypeDetailsQuery = `query Get_Pet_Type($id: ID) {
      petType(id: $id) {
        id
        name
      }
    }`;
  
  exports.petTypeDeleteMutation = `mutation Delete_Pet_Type($id: ID!) {
      deletePetType(id: $id) 
    }`;
  
  exports.petTypeUpsertMutation = `mutation Update_Pet_Type($input: PetTypeInputDTO) {
      updatePetType(input: $input) {
        id
        name
      }
    }`;

/* Pet Description */

exports.petDescriptionListQuery = `query Get_Pet_Description_List {
    petDescriptionList {
      identifier
      description
    }
  }`;
