/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\r\n  query Get_Owner($id: Long) {\r\n    owner(id: $id) {\r\n      id\r\n      firstName\r\n      lastName\r\n      city\r\n      address\r\n      email\r\n      telephone\r\n    }\r\n  }\r\n":
    graphql.Get_OwnerDocument,
  "\r\n  mutation Update_Owner($input: OwnerInputDTOInput) {\r\n    update_Owner(input: $input) {\r\n      id\r\n    }\r\n  }\r\n":
    graphql.Update_OwnerDocument,
  "\r\n              fragment New_OwnerDTO on OwnerDTO {\r\n                id\r\n              }\r\n            ":
    graphql.New_OwnerDtoFragmentDoc,
  "\r\n  query Get_Owner_List {\r\n    ownerList {\r\n      id\r\n      firstName\r\n      lastName\r\n      city\r\n    }\r\n  }\r\n":
    graphql.Get_Owner_ListDocument,
  "\r\n  mutation Delete_Owner($id: Long!) {\r\n    delete_Owner(id: $id)\r\n  }\r\n":
    graphql.Delete_OwnerDocument,
  "\r\n  query Get_Pet($id: Long) {\r\n    pet(id: $id) {\r\n      id\r\n      identificationNumber\r\n      owner {\r\n        firstName\r\n        lastName\r\n      }\r\n    }\r\n  }\r\n":
    graphql.Get_PetDocument,
  "\r\n  mutation Update_Pet($input: PetInputDTOInput) {\r\n    update_Pet(input: $input) {\r\n      id\r\n    }\r\n  }\r\n":
    graphql.Update_PetDocument,
  "\r\n              fragment New_PetDTO on PetDTO {\r\n                id\r\n              }\r\n            ":
    graphql.New_PetDtoFragmentDoc,
  "\r\n  query Get_Pet_List {\r\n    petList {\r\n      id\r\n      identificationNumber\r\n      owner {\r\n        firstName\r\n        lastName\r\n      }\r\n    }\r\n  }\r\n":
    graphql.Get_Pet_ListDocument,
  "\r\n  mutation Delete_Pet($id: Long!) {\r\n    delete_Pet(id: $id)\r\n  }\r\n":
    graphql.Delete_PetDocument,
};

export function gql(
  source: "\r\n  query Get_Owner($id: Long) {\r\n    owner(id: $id) {\r\n      id\r\n      firstName\r\n      lastName\r\n      city\r\n      address\r\n      email\r\n      telephone\r\n    }\r\n  }\r\n"
): typeof documents["\r\n  query Get_Owner($id: Long) {\r\n    owner(id: $id) {\r\n      id\r\n      firstName\r\n      lastName\r\n      city\r\n      address\r\n      email\r\n      telephone\r\n    }\r\n  }\r\n"];
export function gql(
  source: "\r\n  mutation Update_Owner($input: OwnerInputDTOInput) {\r\n    update_Owner(input: $input) {\r\n      id\r\n    }\r\n  }\r\n"
): typeof documents["\r\n  mutation Update_Owner($input: OwnerInputDTOInput) {\r\n    update_Owner(input: $input) {\r\n      id\r\n    }\r\n  }\r\n"];
export function gql(
  source: "\r\n              fragment New_OwnerDTO on OwnerDTO {\r\n                id\r\n              }\r\n            "
): typeof documents["\r\n              fragment New_OwnerDTO on OwnerDTO {\r\n                id\r\n              }\r\n            "];
export function gql(
  source: "\r\n  query Get_Owner_List {\r\n    ownerList {\r\n      id\r\n      firstName\r\n      lastName\r\n      city\r\n    }\r\n  }\r\n"
): typeof documents["\r\n  query Get_Owner_List {\r\n    ownerList {\r\n      id\r\n      firstName\r\n      lastName\r\n      city\r\n    }\r\n  }\r\n"];
export function gql(
  source: "\r\n  mutation Delete_Owner($id: Long!) {\r\n    delete_Owner(id: $id)\r\n  }\r\n"
): typeof documents["\r\n  mutation Delete_Owner($id: Long!) {\r\n    delete_Owner(id: $id)\r\n  }\r\n"];
export function gql(
  source: "\r\n  query Get_Pet($id: Long) {\r\n    pet(id: $id) {\r\n      id\r\n      identificationNumber\r\n      owner {\r\n        firstName\r\n        lastName\r\n      }\r\n    }\r\n  }\r\n"
): typeof documents["\r\n  query Get_Pet($id: Long) {\r\n    pet(id: $id) {\r\n      id\r\n      identificationNumber\r\n      owner {\r\n        firstName\r\n        lastName\r\n      }\r\n    }\r\n  }\r\n"];
export function gql(
  source: "\r\n  mutation Update_Pet($input: PetInputDTOInput) {\r\n    update_Pet(input: $input) {\r\n      id\r\n    }\r\n  }\r\n"
): typeof documents["\r\n  mutation Update_Pet($input: PetInputDTOInput) {\r\n    update_Pet(input: $input) {\r\n      id\r\n    }\r\n  }\r\n"];
export function gql(
  source: "\r\n              fragment New_PetDTO on PetDTO {\r\n                id\r\n              }\r\n            "
): typeof documents["\r\n              fragment New_PetDTO on PetDTO {\r\n                id\r\n              }\r\n            "];
export function gql(
  source: "\r\n  query Get_Pet_List {\r\n    petList {\r\n      id\r\n      identificationNumber\r\n      owner {\r\n        firstName\r\n        lastName\r\n      }\r\n    }\r\n  }\r\n"
): typeof documents["\r\n  query Get_Pet_List {\r\n    petList {\r\n      id\r\n      identificationNumber\r\n      owner {\r\n        firstName\r\n        lastName\r\n      }\r\n    }\r\n  }\r\n"];
export function gql(
  source: "\r\n  mutation Delete_Pet($id: Long!) {\r\n    delete_Pet(id: $id)\r\n  }\r\n"
): typeof documents["\r\n  mutation Delete_Pet($id: Long!) {\r\n    delete_Pet(id: $id)\r\n  }\r\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
