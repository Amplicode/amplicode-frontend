/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_Owner_ListDocument,
  "\n  mutation Delete_Owner($id: BigInteger) {\n    delete_Owner(id: $id)\n  }\n":
    graphql.Delete_OwnerDocument,
  "\n  query Get_Owner($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n":
    graphql.Get_OwnerDocument,
  "\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_OwnerDocument,
  "\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_Pet_ListDocument,
  "\n  mutation Delete_Pet($id: BigInteger) {\n    delete_Pet(id: $id)\n  }\n":
    graphql.Delete_PetDocument,
  "\n  query Get_Pet($id: BigInteger) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Get_PetDocument,
  "\n  mutation Update_Pet($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_PetDocument,
};

export function gql(
  source: "\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner_List {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Owner($id: BigInteger) {\n    delete_Owner(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Owner($id: BigInteger) {\n    delete_Owner(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Owner($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"
): typeof documents["\n  query Get_Owner($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      telephone\n      email\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Owner($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Get_Pet_List {\n    petList {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Pet($id: BigInteger) {\n    delete_Pet(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Pet($id: BigInteger) {\n    delete_Pet(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Get_Pet($id: BigInteger) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Get_Pet($id: BigInteger) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      birthDate\n      type {\n        id\n        name\n      }\n      owner {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Pet($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Pet($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
