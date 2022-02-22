/* eslint-disable */
import * as graphql from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query Owner_OwnerEditor($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n":
    graphql.Owner_OwnerEditorDocument,
  "\n  mutation Update_Owner_OwnerEditor($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_Owner_OwnerEditorDocument,
  "\n  query OwnerList_OwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n":
    graphql.OwnerList_OwnerListDocument,
  "\n  mutation Delete_Owner_OwnerList($id: BigInteger!) {\n    delete_Owner(id: $id)\n  }\n":
    graphql.Delete_Owner_OwnerListDocument,
  "\n  query Pet_PetEditor($id: BigInteger) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.Pet_PetEditorDocument,
  "\n  mutation Update_Pet_PetEditor($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n":
    graphql.Update_Pet_PetEditorDocument,
  "\n  query PetList_PetList {\n    petList {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n":
    graphql.PetList_PetListDocument,
  "\n  mutation Delete_Pet_PetList($id: BigInteger!) {\n    delete_Pet(id: $id)\n  }\n":
    graphql.Delete_Pet_PetListDocument,
  "\n  query Owner_ReadOnlyOwnerDetails($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n":
    graphql.Owner_ReadOnlyOwnerDetailsDocument,
  "\n  query OwnerList_ReadOnlyOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n":
    graphql.OwnerList_ReadOnlyOwnerListDocument,
  "\n  query OwnerList_StandaloneOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n":
    graphql.OwnerList_StandaloneOwnerListDocument,
  "\n  mutation Delete_Owner_StandaloneOwnerList($id: BigInteger!) {\n    delete_Owner(id: $id)\n  }\n":
    graphql.Delete_Owner_StandaloneOwnerListDocument,
};

export function gql(
  source: "\n  query Owner_OwnerEditor($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n"
): typeof documents["\n  query Owner_OwnerEditor($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Owner_OwnerEditor($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Owner_OwnerEditor($input: OwnerInputDTOInput) {\n    update_Owner(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  query OwnerList_OwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"
): typeof documents["\n  query OwnerList_OwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Owner_OwnerList($id: BigInteger!) {\n    delete_Owner(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Owner_OwnerList($id: BigInteger!) {\n    delete_Owner(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Pet_PetEditor($id: BigInteger) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query Pet_PetEditor($id: BigInteger) {\n    pet(id: $id) {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Update_Pet_PetEditor($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n"
): typeof documents["\n  mutation Update_Pet_PetEditor($input: PetInputDTOInput) {\n    update_Pet(input: $input) {\n      id\n    }\n  }\n"];
export function gql(
  source: "\n  query PetList_PetList {\n    petList {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"
): typeof documents["\n  query PetList_PetList {\n    petList {\n      id\n      identificationNumber\n      owner {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Pet_PetList($id: BigInteger!) {\n    delete_Pet(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Pet_PetList($id: BigInteger!) {\n    delete_Pet(id: $id)\n  }\n"];
export function gql(
  source: "\n  query Owner_ReadOnlyOwnerDetails($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n"
): typeof documents["\n  query Owner_ReadOnlyOwnerDetails($id: BigInteger) {\n    owner(id: $id) {\n      id\n      firstName\n      lastName\n      city\n      address\n      email\n      telephone\n    }\n  }\n"];
export function gql(
  source: "\n  query OwnerList_ReadOnlyOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"
): typeof documents["\n  query OwnerList_ReadOnlyOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"];
export function gql(
  source: "\n  query OwnerList_StandaloneOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"
): typeof documents["\n  query OwnerList_StandaloneOwnerList {\n    ownerList {\n      id\n      firstName\n      lastName\n      city\n    }\n  }\n"];
export function gql(
  source: "\n  mutation Delete_Owner_StandaloneOwnerList($id: BigInteger!) {\n    delete_Owner(id: $id)\n  }\n"
): typeof documents["\n  mutation Delete_Owner_StandaloneOwnerList($id: BigInteger!) {\n    delete_Owner(id: $id)\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
