/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_Owner_ListDocument,
  "\n  query Get_Pet_Disease_List {\n    petDiseaseList {\n      description\n      name\n      petDiseaseIdentifier\n    }\n  }\n":
    graphql.Get_Pet_Disease_ListDocument,
  "\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_Pet_ListDocument,
  "\n  query Get_Pet_Type_List {\n    petTypeList {\n      id, \n      name\n    }\n  }\n":
    graphql.Get_Pet_Type_ListDocument,
  "\n  mutation Delete_Owner($id: ID!) {\n    deleteOwner(id: $id)\n  }\n":
    graphql.Delete_OwnerDocument,
  "\n  query Get_Owner($id: ID) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_OwnerDocument,
  "\n  mutation Update_Owner($input: OwnerInputDTO) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_OwnerDocument,
  "\n  query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {\n    ownerByNamesList(filter: $filter) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_Owner_List_With_FilterDocument,
  "\n  query Get_Pet_List_With_Filter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_Pet_List_With_FilterDocument,
  "\n  mutation Delete_Pet($id: ID!) {\n    deletePet(id: $id)\n  }\n":
    graphql.Delete_PetDocument,
  "\n  query Get_Pet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_PetDocument,
  "\n  mutation Update_Pet($input: PetInputDTO) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_PetDocument,
  "\n  mutation Delete_Pet_Disease($id: ID!) {\n    deletePetDisease(petDiseaseIdentifier: $id)\n  }\n":
    graphql.Delete_Pet_DiseaseDocument,
  "\n  query Get_Pet_Disease($id: ID) {\n    petDisease(petDiseaseIdentifier: $id) {\n      description\n      name\n      petDiseaseIdentifier\n    }\n  }\n":
    graphql.Get_Pet_DiseaseDocument,
  "\n  mutation Update_Pet_Disease($input: PetDiseaseInputDTO) {\n    updatePetDisease(input: $input) {\n      petDiseaseIdentifier\n    }\n  }\n":
    graphql.Update_Pet_DiseaseDocument,
  "\n  query Get_NN_Scalars_List {\n    notNullScalarsTestEntityList {\n      id\n      bigDecimalNotNull\n      bigIntNotNull\n      dateTestNotNull\n      localDateNotNull\n      localDateTimeNotNull\n      localTimeNotNull\n      offsetDateTimeNotNull\n      offsetTimeNotNull\n      stringNotNull\n      urlNotNull\n    }\n  }\n":
    graphql.Get_Nn_Scalars_ListDocument,
  "\n  mutation Delete_NN_Scalars($id: ID!) {\n    deleteNotNullScalarsTestEntity(id: $id)\n  }\n":
    graphql.Delete_Nn_ScalarsDocument,
  "\n  query Get_NN_Scalars($id: ID) {\n    notNullScalarsTestEntity(id: $id) {\n      id\n      bigDecimalNotNull\n      bigIntNotNull\n      dateTestNotNull\n      localDateNotNull\n      localDateTimeNotNull\n      localTimeNotNull\n      offsetDateTimeNotNull\n      offsetTimeNotNull\n      stringNotNull\n      urlNotNull\n    }\n  }\n":
    graphql.Get_Nn_ScalarsDocument,
  "\n  mutation Update_NN_Scalars($input: NotNullScalarsTestEntityInput) {\n    updateNotNullScalarsTestEntity(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_Nn_ScalarsDocument,
  "\n  query Get_Scalars_List {\n    scalarsTestEntityList {\n      id\n      intTest\n      intPrimitive\n      byteTest\n      bytePrimitive\n      shortTest\n      shortPrimitive\n      doubleTest\n      doublePrimitive\n      floatTest\n      floatPrimitive\n      string\n      bool\n      boolPrimitive\n      bigInt\n      longTest\n      longPrimitive\n      bigDecimal\n      localDate\n      localDateTime\n      localTime\n      offsetDateTime\n      offsetTime\n      dateTest\n      url\n    }\n  }\n":
    graphql.Get_Scalars_ListDocument,
  "\n  mutation Delete_Scalars($id: ID!) {\n    deleteScalarsTestEntity(id: $id)\n  }\n":
    graphql.Delete_ScalarsDocument,
  "\n  query Get_Scalars($id: ID) {\n    scalarsTestEntity(id: $id) {\n      id\n      intTest\n      intPrimitive\n      byteTest\n      bytePrimitive\n      shortTest\n      shortPrimitive\n      doubleTest\n      doublePrimitive\n      floatTest\n      floatPrimitive\n      string\n      bool\n      boolPrimitive\n      bigInt\n      longTest\n      longPrimitive\n      bigDecimal\n      localDate\n      localDateTime\n      localTime\n      offsetDateTime\n      offsetTime\n      dateTest\n      url\n    }\n  }\n":
    graphql.Get_ScalarsDocument,
  "\n  mutation Update_Scalars($input: ScalarsTestEntityInput) {\n    updateScalarsTestEntity(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_ScalarsDocument,
};

export function gql(
  source: "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Pet_Disease_List {\n    petDiseaseList {\n      description\n      name\n      petDiseaseIdentifier\n    }\n  }\n"
): typeof documents["\n  query Get_Pet_Disease_List {\n    petDiseaseList {\n      description\n      name\n      petDiseaseIdentifier\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Pet_Type_List {\n    petTypeList {\n      id, \n      name\n    }\n  }\n"
): typeof documents["\n  query Get_Pet_Type_List {\n    petTypeList {\n      id, \n      name\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Owner($id: ID!) {\n    deleteOwner(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Owner($id: ID!) {\n    deleteOwner(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Owner($id: ID) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner($id: ID) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Owner($input: OwnerInputDTO) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Owner($input: OwnerInputDTO) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {\n    ownerByNamesList(filter: $filter) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {\n    ownerByNamesList(filter: $filter) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Pet_List_With_Filter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Get_Pet_List_With_Filter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Pet($id: ID!) {\n    deletePet(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Pet($id: ID!) {\n    deletePet(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Pet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Get_Pet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Pet($input: PetInputDTO) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Pet($input: PetInputDTO) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Pet_Disease($id: ID!) {\n    deletePetDisease(petDiseaseIdentifier: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Pet_Disease($id: ID!) {\n    deletePetDisease(petDiseaseIdentifier: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Pet_Disease($id: ID) {\n    petDisease(petDiseaseIdentifier: $id) {\n      description\n      name\n      petDiseaseIdentifier\n    }\n  }\n"
): typeof documents["\n  query Get_Pet_Disease($id: ID) {\n    petDisease(petDiseaseIdentifier: $id) {\n      description\n      name\n      petDiseaseIdentifier\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Pet_Disease($input: PetDiseaseInputDTO) {\n    updatePetDisease(input: $input) {\n      petDiseaseIdentifier\n    }\n  }\n"
): typeof documents["\n  mutation Update_Pet_Disease($input: PetDiseaseInputDTO) {\n    updatePetDisease(input: $input) {\n      petDiseaseIdentifier\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_NN_Scalars_List {\n    notNullScalarsTestEntityList {\n      id\n      bigDecimalNotNull\n      bigIntNotNull\n      dateTestNotNull\n      localDateNotNull\n      localDateTimeNotNull\n      localTimeNotNull\n      offsetDateTimeNotNull\n      offsetTimeNotNull\n      stringNotNull\n      urlNotNull\n    }\n  }\n"
): typeof documents["\n  query Get_NN_Scalars_List {\n    notNullScalarsTestEntityList {\n      id\n      bigDecimalNotNull\n      bigIntNotNull\n      dateTestNotNull\n      localDateNotNull\n      localDateTimeNotNull\n      localTimeNotNull\n      offsetDateTimeNotNull\n      offsetTimeNotNull\n      stringNotNull\n      urlNotNull\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_NN_Scalars($id: ID!) {\n    deleteNotNullScalarsTestEntity(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_NN_Scalars($id: ID!) {\n    deleteNotNullScalarsTestEntity(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_NN_Scalars($id: ID) {\n    notNullScalarsTestEntity(id: $id) {\n      id\n      bigDecimalNotNull\n      bigIntNotNull\n      dateTestNotNull\n      localDateNotNull\n      localDateTimeNotNull\n      localTimeNotNull\n      offsetDateTimeNotNull\n      offsetTimeNotNull\n      stringNotNull\n      urlNotNull\n    }\n  }\n"
): typeof documents["\n  query Get_NN_Scalars($id: ID) {\n    notNullScalarsTestEntity(id: $id) {\n      id\n      bigDecimalNotNull\n      bigIntNotNull\n      dateTestNotNull\n      localDateNotNull\n      localDateTimeNotNull\n      localTimeNotNull\n      offsetDateTimeNotNull\n      offsetTimeNotNull\n      stringNotNull\n      urlNotNull\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_NN_Scalars($input: NotNullScalarsTestEntityInput) {\n    updateNotNullScalarsTestEntity(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_NN_Scalars($input: NotNullScalarsTestEntityInput) {\n    updateNotNullScalarsTestEntity(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Scalars_List {\n    scalarsTestEntityList {\n      id\n      intTest\n      intPrimitive\n      byteTest\n      bytePrimitive\n      shortTest\n      shortPrimitive\n      doubleTest\n      doublePrimitive\n      floatTest\n      floatPrimitive\n      string\n      bool\n      boolPrimitive\n      bigInt\n      longTest\n      longPrimitive\n      bigDecimal\n      localDate\n      localDateTime\n      localTime\n      offsetDateTime\n      offsetTime\n      dateTest\n      url\n    }\n  }\n"
): typeof documents["\n  query Get_Scalars_List {\n    scalarsTestEntityList {\n      id\n      intTest\n      intPrimitive\n      byteTest\n      bytePrimitive\n      shortTest\n      shortPrimitive\n      doubleTest\n      doublePrimitive\n      floatTest\n      floatPrimitive\n      string\n      bool\n      boolPrimitive\n      bigInt\n      longTest\n      longPrimitive\n      bigDecimal\n      localDate\n      localDateTime\n      localTime\n      offsetDateTime\n      offsetTime\n      dateTest\n      url\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Scalars($id: ID!) {\n    deleteScalarsTestEntity(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Scalars($id: ID!) {\n    deleteScalarsTestEntity(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Scalars($id: ID) {\n    scalarsTestEntity(id: $id) {\n      id\n      intTest\n      intPrimitive\n      byteTest\n      bytePrimitive\n      shortTest\n      shortPrimitive\n      doubleTest\n      doublePrimitive\n      floatTest\n      floatPrimitive\n      string\n      bool\n      boolPrimitive\n      bigInt\n      longTest\n      longPrimitive\n      bigDecimal\n      localDate\n      localDateTime\n      localTime\n      offsetDateTime\n      offsetTime\n      dateTest\n      url\n    }\n  }\n"
): typeof documents["\n  query Get_Scalars($id: ID) {\n    scalarsTestEntity(id: $id) {\n      id\n      intTest\n      intPrimitive\n      byteTest\n      bytePrimitive\n      shortTest\n      shortPrimitive\n      doubleTest\n      doublePrimitive\n      floatTest\n      floatPrimitive\n      string\n      bool\n      boolPrimitive\n      bigInt\n      longTest\n      longPrimitive\n      bigDecimal\n      localDate\n      localDateTime\n      localTime\n      offsetDateTime\n      offsetTime\n      dateTest\n      url\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Scalars($input: ScalarsTestEntityInput) {\n    updateScalarsTestEntity(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Scalars($input: ScalarsTestEntityInput) {\n    updateScalarsTestEntity(input: $input) {\n      id\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
