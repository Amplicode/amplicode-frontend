export const notNullScalarsListQuery = `
query Get_NN_Scalars_List {
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

export const notNullScalarsDeleteMutation = `
mutation Delete_NN_Scalars($id: ID!) {
    deleteNotNullScalarsTestEntity(id: $id)
  }`;

export const notNullScalarsDetailsQuery = `
query Get_NN_Scalars($id: ID) {
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

export const notNullScalarsUpsertMutation = `
mutation Update_NN_Scalars($input: NotNullScalarsTestEntityInput) {
    updateNotNullScalarsTestEntity(input: $input) {
      id
    }
  }`;


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
mutation Update_Owner($input: OwnerInputDTO) {
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

/* Scalars */

export const scalarsListQuery = `query Get_Scalars_List {
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


export const scalarsDetailsQuery = `query Get_Scalars($id: ID) {
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

export const scalarsDeleteMutation = `mutation Delete_Scalars($id: ID!) {
    deleteScalarsTestEntity(id: $id)
  }`;


export const scalarsUpsertMutation = `mutation Update_Scalars($input: ScalarsTestEntityInput) {
    updateScalarsTestEntity(input: $input) {
      id
    }
  }`;



