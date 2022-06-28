/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query UserInfo {\n    userInfo {\n      username\n    }\n  }\n":
    graphql.UserInfoDocument,
  "\n  query GetOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.GetOwnerListDocument,
  "\n  mutation DeleteOwner($id: ID!) {\n    deleteOwner(id: $id)\n  }\n":
    graphql.DeleteOwnerDocument,
  "\n  query Get_Owner($id: ID) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_OwnerDocument,
  "\n  mutation Update_Owner($input: OwnerInputDTO) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_OwnerDocument,
  "\n  query GetPetListWithFilter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      __typename\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n      description {\n        identifier\n        description\n      }\n      tags {\n        id\n        name\n      }\n      diseases {\n        petDiseaseIdentifier\n        name\n        description\n      }\n    }\n  }\n":
    graphql.GetPetListWithFilterDocument,
  "\n  mutation DeletePet($id: ID!) {\n    deletePet(id: $id)\n  }\n":
    graphql.DeletePetDocument,
  "\n  query GetPet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n      description {\n        identifier\n        description\n      }\n      tags {\n        id\n        name\n      }\n      diseases {\n        petDiseaseIdentifier\n        name\n        description\n      }      \n    }\n  }\n":
    graphql.GetPetDocument,
  "\n  mutation UpdatePet($input: PetInputDTO) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n":
    graphql.UpdatePetDocument,
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
  source: "\n  query UserInfo {\n    userInfo {\n      username\n    }\n  }\n"
): typeof documents["\n  query UserInfo {\n    userInfo {\n      username\n    }\n  }\n"];
export function gql(
  source: "\n  query GetOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query GetOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  mutation DeleteOwner($id: ID!) {\n    deleteOwner(id: $id)\n  }\n"
): typeof documents["\n  mutation DeleteOwner($id: ID!) {\n    deleteOwner(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Owner($id: ID) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner($id: ID) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Owner($input: OwnerInputDTO) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Owner($input: OwnerInputDTO) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  query GetPetListWithFilter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      __typename\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n      description {\n        identifier\n        description\n      }\n      tags {\n        id\n        name\n      }\n      diseases {\n        petDiseaseIdentifier\n        name\n        description\n      }\n    }\n  }\n"
): typeof documents["\n  query GetPetListWithFilter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      __typename\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n      description {\n        identifier\n        description\n      }\n      tags {\n        id\n        name\n      }\n      diseases {\n        petDiseaseIdentifier\n        name\n        description\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation DeletePet($id: ID!) {\n    deletePet(id: $id)\n  }\n"
): typeof documents["\n  mutation DeletePet($id: ID!) {\n    deletePet(id: $id)\n  }\n"];
export function gql(
  source: "\n  query GetPet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n      description {\n        identifier\n        description\n      }\n      tags {\n        id\n        name\n      }\n      diseases {\n        petDiseaseIdentifier\n        name\n        description\n      }      \n    }\n  }\n"
): typeof documents["\n  query GetPet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n      description {\n        identifier\n        description\n      }\n      tags {\n        id\n        name\n      }\n      diseases {\n        petDiseaseIdentifier\n        name\n        description\n      }      \n    }\n  }\n"];
export function gql(
  source: "\n  mutation UpdatePet($input: PetInputDTO) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation UpdatePet($input: PetInputDTO) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n"];
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
