/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_Owner_ListDocument,
  "\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_Pet_ListDocument,
  "\n  query Get_Pet_Type_List {\n    petTypeList {\n      id, \n      name\n    }\n  }\n":
    graphql.Get_Pet_Type_ListDocument,
  "\n  mutation Delete_Owner($id: ID!) {\n    deleteOwner(id: $id)\n  }\n":
    graphql.Delete_OwnerDocument,
  "\n  query Get_Owner($id: ID) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_OwnerDocument,
  "\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_OwnerDocument,
  "\n  query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {\n    ownerByNamesList(filter: $filter) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_Owner_List_With_FilterDocument,
  "\n  query Get_New_Pet_List_With_Filter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_New_Pet_List_With_FilterDocument,
  "\n  mutation Delete_Pet($id: ID!) {\n    deletePet(id: $id)\n  }\n":
    graphql.Delete_PetDocument,
  "\n  query Get_Pet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_PetDocument,
  "\n  mutation Update_Pet($input: PetInputDTOInput) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_PetDocument,
};

export function gql(
  source: "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
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
  source: "\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    updateOwner(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {\n    ownerByNamesList(filter: $filter) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner_List_With_Filter($filter: OwnerFilterInput) {\n    ownerByNamesList(filter: $filter) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_New_Pet_List_With_Filter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Get_New_Pet_List_With_Filter($identificationNumber: String) {\n    petByIdentificationNumberList(identificationNumber: $identificationNumber) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Pet($id: ID!) {\n    deletePet(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Pet($id: ID!) {\n    deletePet(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Pet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Get_Pet($id: ID) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Pet($input: PetInputDTOInput) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Pet($input: PetInputDTOInput) {\n    updatePet(input: $input) {\n      id\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
