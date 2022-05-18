/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Java Type: BigDecimal */
  BigDecimal: any;
  /** Java Type: BigInteger */
  BigInteger: any;
  /** Java Type: LocalDate */
  Date: any;
  /** Java Type: OffsetDateTime */
  DateTime: any;
  /** Java Type: LocalDateTime */
  LocalDateTime: any;
  /** Java Type: LocalTime */
  LocalTime: any;
  /** Java Type: Long, long */
  Long: any;
  /** Java Type: OffsetTime */
  Time: any;
  /** Java Type: Date */
  Timestamp: any;
  /** Java Type: URL */
  Url: any;
  /** Java Type: Void */
  Void: any;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  deleteOwner?: Maybe<Scalars["Void"]>;
  deletePet?: Maybe<Scalars["Void"]>;
  deletePetDescription?: Maybe<Scalars["Void"]>;
  deletePetDisease?: Maybe<Scalars["Void"]>;
  deletePetType?: Maybe<Scalars["Void"]>;
  deleteScalarsTestEntity?: Maybe<Scalars["Void"]>;
  deleteTag?: Maybe<Scalars["Void"]>;
  deleteVisit?: Maybe<Scalars["Void"]>;
  updateOwner?: Maybe<OwnerDto>;
  updatePet?: Maybe<PetDto>;
  updatePetDescription?: Maybe<PetDescription>;
  updatePetDisease?: Maybe<PetDisease>;
  updatePetType?: Maybe<PetTypeDto>;
  updateScalarsTestEntity?: Maybe<ScalarsTestEntity>;
  updateTag?: Maybe<TagDto>;
  updateVisit?: Maybe<VisitDto>;
};

/** Mutation root */
export type MutationDeleteOwnerArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeletePetArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeletePetDescriptionArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeletePetDiseaseArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeletePetTypeArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteScalarsTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Mutation root */
export type MutationDeleteTagArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Mutation root */
export type MutationDeleteVisitArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Mutation root */
export type MutationUpdateOwnerArgs = {
  input?: InputMaybe<OwnerInputDto>;
};

/** Mutation root */
export type MutationUpdatePetArgs = {
  input?: InputMaybe<PetInputDto>;
};

/** Mutation root */
export type MutationUpdatePetDescriptionArgs = {
  input?: InputMaybe<PetDescriptionInput>;
};

/** Mutation root */
export type MutationUpdatePetDiseaseArgs = {
  input?: InputMaybe<PetDiseaseInput>;
};

/** Mutation root */
export type MutationUpdatePetTypeArgs = {
  input?: InputMaybe<PetTypeInputDto>;
};

/** Mutation root */
export type MutationUpdateScalarsTestEntityArgs = {
  input?: InputMaybe<ScalarsTestEntityInput>;
};

/** Mutation root */
export type MutationUpdateTagArgs = {
  input?: InputMaybe<TagInputDto>;
};

/** Mutation root */
export type MutationUpdateVisitArgs = {
  input?: InputMaybe<VisitInputDto>;
};

export type OwnerDto = {
  __typename?: "OwnerDTO";
  address?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  lastName?: Maybe<Scalars["String"]>;
  telephone?: Maybe<Scalars["String"]>;
};

export type OwnerDtoInput = {
  address?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  telephone?: InputMaybe<Scalars["String"]>;
};

export type OwnerFilterInput = {
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
};

export type OwnerInputDto = {
  address?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  telephone?: InputMaybe<Scalars["String"]>;
};

export type PetDto = {
  __typename?: "PetDTO";
  birthDate?: Maybe<Scalars["Date"]>;
  id?: Maybe<Scalars["ID"]>;
  identificationNumber?: Maybe<Scalars["String"]>;
  owner?: Maybe<OwnerDto>;
  tags?: Maybe<Array<Maybe<TagDto>>>;
  type?: Maybe<PetTypeDto>;
};

export type PetDtoInput = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  id?: InputMaybe<Scalars["ID"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
  tags?: InputMaybe<Array<InputMaybe<TagDtoInput>>>;
  type?: InputMaybe<PetTypeDtoInput>;
};

export type PetDescription = {
  __typename?: "PetDescription";
  description?: Maybe<Scalars["String"]>;
  identifier?: Maybe<Scalars["ID"]>;
};

export type PetDescriptionInput = {
  description?: InputMaybe<Scalars["String"]>;
  identifier?: InputMaybe<Scalars["ID"]>;
};

export type PetDisease = {
  __typename?: "PetDisease";
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  petDiseaseIdentifier?: Maybe<Scalars["ID"]>;
};

export type PetDiseaseInput = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  petDiseaseIdentifier?: InputMaybe<Scalars["ID"]>;
};

export type PetInputDto = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  id?: InputMaybe<Scalars["ID"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
  tags?: InputMaybe<Array<InputMaybe<TagDtoInput>>>;
  type?: InputMaybe<PetTypeDtoInput>;
};

export type PetTypeDto = {
  __typename?: "PetTypeDTO";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PetTypeDtoInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type PetTypeInputDto = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** Query root */
export type Query = {
  __typename?: "Query";
  owner?: Maybe<OwnerDto>;
  ownerByNamesList?: Maybe<Array<Maybe<OwnerDto>>>;
  ownerByNamesSeparateMethodsList?: Maybe<Array<Maybe<OwnerDto>>>;
  ownerList?: Maybe<Array<Maybe<OwnerDto>>>;
  pet?: Maybe<PetDto>;
  petByIdentificationNumberList?: Maybe<Array<Maybe<PetDto>>>;
  petDescription?: Maybe<PetDescription>;
  petDescriptionList?: Maybe<Array<Maybe<PetDescription>>>;
  petDisease?: Maybe<PetDisease>;
  petDiseaseList?: Maybe<Array<Maybe<PetDisease>>>;
  petList?: Maybe<Array<Maybe<PetDto>>>;
  petListByTypeId?: Maybe<Array<Maybe<PetDto>>>;
  petType?: Maybe<PetTypeDto>;
  petTypeList?: Maybe<Array<Maybe<PetTypeDto>>>;
  scalarsTestEntity?: Maybe<ScalarsTestEntity>;
  scalarsTestEntityList?: Maybe<Array<Maybe<ScalarsTestEntity>>>;
  tag?: Maybe<TagDto>;
  tagList?: Maybe<Array<Maybe<TagDto>>>;
  userInfo?: Maybe<UserInfo>;
  visit?: Maybe<VisitDto>;
  visitList?: Maybe<Array<Maybe<VisitDto>>>;
};

/** Query root */
export type QueryOwnerArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryOwnerByNamesListArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
};

/** Query root */
export type QueryOwnerByNamesSeparateMethodsListArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
};

/** Query root */
export type QueryPetArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryPetByIdentificationNumberListArgs = {
  identificationNumber?: InputMaybe<Scalars["String"]>;
};

/** Query root */
export type QueryPetDescriptionArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryPetDiseaseArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryPetListByTypeIdArgs = {
  typeId: Scalars["ID"];
};

/** Query root */
export type QueryPetTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryScalarsTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryTagArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryVisitArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type ScalarsTestEntity = {
  __typename?: "ScalarsTestEntity";
  bigDecimal?: Maybe<Scalars["BigDecimal"]>;
  bigInt?: Maybe<Scalars["BigInteger"]>;
  bool?: Maybe<Scalars["Boolean"]>;
  boolPrimitive: Scalars["Boolean"];
  bytePrimitive: Scalars["Int"];
  byteTest?: Maybe<Scalars["Int"]>;
  dateTest?: Maybe<Scalars["Timestamp"]>;
  doublePrimitive: Scalars["Float"];
  doubleTest?: Maybe<Scalars["Float"]>;
  floatPrimitive: Scalars["Float"];
  floatTest?: Maybe<Scalars["Float"]>;
  id?: Maybe<Scalars["ID"]>;
  intPrimitive: Scalars["Int"];
  intTest?: Maybe<Scalars["Int"]>;
  localDate?: Maybe<Scalars["Date"]>;
  localDateTime?: Maybe<Scalars["LocalDateTime"]>;
  localTime?: Maybe<Scalars["LocalTime"]>;
  longPrimitive: Scalars["Long"];
  longTest?: Maybe<Scalars["Long"]>;
  offsetDateTime?: Maybe<Scalars["DateTime"]>;
  offsetTime?: Maybe<Scalars["Time"]>;
  shortPrimitive: Scalars["Int"];
  shortTest?: Maybe<Scalars["Int"]>;
  string?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["Url"]>;
};

export type ScalarsTestEntityInput = {
  bigDecimal?: InputMaybe<Scalars["BigDecimal"]>;
  bigInt?: InputMaybe<Scalars["BigInteger"]>;
  bool?: InputMaybe<Scalars["Boolean"]>;
  boolPrimitive: Scalars["Boolean"];
  bytePrimitive: Scalars["Int"];
  byteTest?: InputMaybe<Scalars["Int"]>;
  dateTest?: InputMaybe<Scalars["Timestamp"]>;
  doublePrimitive: Scalars["Float"];
  doubleTest?: InputMaybe<Scalars["Float"]>;
  floatPrimitive: Scalars["Float"];
  floatTest?: InputMaybe<Scalars["Float"]>;
  id?: InputMaybe<Scalars["ID"]>;
  intPrimitive: Scalars["Int"];
  intTest?: InputMaybe<Scalars["Int"]>;
  localDate?: InputMaybe<Scalars["Date"]>;
  localDateTime?: InputMaybe<Scalars["LocalDateTime"]>;
  localTime?: InputMaybe<Scalars["LocalTime"]>;
  longPrimitive: Scalars["Long"];
  longTest?: InputMaybe<Scalars["Long"]>;
  offsetDateTime?: InputMaybe<Scalars["DateTime"]>;
  offsetTime?: InputMaybe<Scalars["Time"]>;
  shortPrimitive: Scalars["Int"];
  shortTest?: InputMaybe<Scalars["Int"]>;
  string?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["Url"]>;
};

export type TagDto = {
  __typename?: "TagDTO";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type TagDtoInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type TagInputDto = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type UserInfo = {
  __typename?: "UserInfo";
  username?: Maybe<Scalars["String"]>;
};

export type VisitDto = {
  __typename?: "VisitDTO";
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  pet?: Maybe<PetDto>;
  visitEnd?: Maybe<Scalars["LocalDateTime"]>;
  visitStart?: Maybe<Scalars["LocalDateTime"]>;
};

export type VisitInputDto = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  pet?: InputMaybe<PetDtoInput>;
  visitEnd?: InputMaybe<Scalars["LocalDateTime"]>;
  visitStart?: InputMaybe<Scalars["LocalDateTime"]>;
};

export type Get_Owner_ListQueryVariables = Exact<{ [key: string]: never }>;

export type Get_Owner_ListQuery = {
  __typename?: "Query";
  ownerList?: Array<{
    __typename?: "OwnerDTO";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
  } | null> | null;
};

export type Get_Pet_ListQueryVariables = Exact<{ [key: string]: never }>;

export type Get_Pet_ListQuery = {
  __typename?: "Query";
  petList?: Array<{
    __typename?: "PetDTO";
    id?: string | null;
    identificationNumber?: string | null;
    birthDate?: any | null;
    type?: {
      __typename?: "PetTypeDTO";
      id?: string | null;
      name?: string | null;
    } | null;
    owner?: {
      __typename?: "OwnerDTO";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  } | null> | null;
};

export type Get_Pet_Type_ListQueryVariables = Exact<{ [key: string]: never }>;

export type Get_Pet_Type_ListQuery = {
  __typename?: "Query";
  petTypeList?: Array<{
    __typename?: "PetTypeDTO";
    id?: string | null;
    name?: string | null;
  } | null> | null;
};

export type Delete_OwnerMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type Delete_OwnerMutation = {
  __typename?: "Mutation";
  deleteOwner?: any | null;
};

export type Get_OwnerQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type Get_OwnerQuery = {
  __typename?: "Query";
  owner?: {
    __typename?: "OwnerDTO";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
  } | null;
};

export type Update_OwnerMutationVariables = Exact<{
  input?: InputMaybe<OwnerInputDto>;
}>;

export type Update_OwnerMutation = {
  __typename?: "Mutation";
  updateOwner?: { __typename?: "OwnerDTO"; id?: string | null } | null;
};

export type Get_Owner_List_With_FilterQueryVariables = Exact<{
  filter?: InputMaybe<OwnerFilterInput>;
}>;

export type Get_Owner_List_With_FilterQuery = {
  __typename?: "Query";
  ownerByNamesList?: Array<{
    __typename?: "OwnerDTO";
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
    address?: string | null;
    telephone?: string | null;
    email?: string | null;
  } | null> | null;
};

export type Get_Pet_List_With_FilterQueryVariables = Exact<{
  identificationNumber?: InputMaybe<Scalars["String"]>;
}>;

export type Get_Pet_List_With_FilterQuery = {
  __typename?: "Query";
  petByIdentificationNumberList?: Array<{
    __typename?: "PetDTO";
    id?: string | null;
    identificationNumber?: string | null;
    birthDate?: any | null;
    type?: {
      __typename?: "PetTypeDTO";
      id?: string | null;
      name?: string | null;
    } | null;
    owner?: {
      __typename?: "OwnerDTO";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  } | null> | null;
};

export type Delete_PetMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type Delete_PetMutation = {
  __typename?: "Mutation";
  deletePet?: any | null;
};

export type Get_PetQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type Get_PetQuery = {
  __typename?: "Query";
  pet?: {
    __typename?: "PetDTO";
    id?: string | null;
    identificationNumber?: string | null;
    birthDate?: any | null;
    type?: {
      __typename?: "PetTypeDTO";
      id?: string | null;
      name?: string | null;
    } | null;
    owner?: {
      __typename?: "OwnerDTO";
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type Update_PetMutationVariables = Exact<{
  input?: InputMaybe<PetInputDto>;
}>;

export type Update_PetMutation = {
  __typename?: "Mutation";
  updatePet?: { __typename?: "PetDTO"; id?: string | null } | null;
};

export type Get_Scalars_ListQueryVariables = Exact<{ [key: string]: never }>;

export type Get_Scalars_ListQuery = {
  __typename?: "Query";
  scalarsTestEntityList?: Array<{
    __typename?: "ScalarsTestEntity";
    id?: string | null;
    intTest?: number | null;
    intPrimitive: number;
    byteTest?: number | null;
    bytePrimitive: number;
    shortTest?: number | null;
    shortPrimitive: number;
    doubleTest?: number | null;
    doublePrimitive: number;
    floatTest?: number | null;
    floatPrimitive: number;
    string?: string | null;
    bool?: boolean | null;
    boolPrimitive: boolean;
    bigInt?: any | null;
    longTest?: any | null;
    longPrimitive: any;
    bigDecimal?: any | null;
    localDate?: any | null;
    localDateTime?: any | null;
    localTime?: any | null;
    offsetDateTime?: any | null;
    offsetTime?: any | null;
    dateTest?: any | null;
  } | null> | null;
};

export type Delete_ScalarsMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type Delete_ScalarsMutation = {
  __typename?: "Mutation";
  deleteScalarsTestEntity?: any | null;
};

export type Get_ScalarsQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type Get_ScalarsQuery = {
  __typename?: "Query";
  scalarsTestEntity?: {
    __typename?: "ScalarsTestEntity";
    id?: string | null;
    intTest?: number | null;
    intPrimitive: number;
    byteTest?: number | null;
    bytePrimitive: number;
    shortTest?: number | null;
    shortPrimitive: number;
    doubleTest?: number | null;
    doublePrimitive: number;
    floatTest?: number | null;
    floatPrimitive: number;
    string?: string | null;
    bool?: boolean | null;
    boolPrimitive: boolean;
    bigInt?: any | null;
    longTest?: any | null;
    longPrimitive: any;
    bigDecimal?: any | null;
    localDate?: any | null;
    localDateTime?: any | null;
    localTime?: any | null;
    offsetDateTime?: any | null;
    offsetTime?: any | null;
    dateTest?: any | null;
  } | null;
};

export type Update_ScalarsMutationVariables = Exact<{
  input?: InputMaybe<ScalarsTestEntityInput>;
}>;

export type Update_ScalarsMutation = {
  __typename?: "Mutation";
  updateScalarsTestEntity?: {
    __typename?: "ScalarsTestEntity";
    id?: string | null;
  } | null;
};

export const Get_Owner_ListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Owner_List" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ownerList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "telephone" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Get_Owner_ListQuery, Get_Owner_ListQueryVariables>;
export const Get_Pet_ListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Pet_List" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "identificationNumber" },
                },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "type" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Get_Pet_ListQuery, Get_Pet_ListQueryVariables>;
export const Get_Pet_Type_ListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Pet_Type_List" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petTypeList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Get_Pet_Type_ListQuery,
  Get_Pet_Type_ListQueryVariables
>;
export const Delete_OwnerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Delete_Owner" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteOwner" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Delete_OwnerMutation,
  Delete_OwnerMutationVariables
>;
export const Get_OwnerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Owner" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "telephone" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Get_OwnerQuery, Get_OwnerQueryVariables>;
export const Update_OwnerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Update_Owner" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OwnerInputDTO" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateOwner" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Update_OwnerMutation,
  Update_OwnerMutationVariables
>;
export const Get_Owner_List_With_FilterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Owner_List_With_Filter" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OwnerFilterInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ownerByNamesList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "telephone" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Get_Owner_List_With_FilterQuery,
  Get_Owner_List_With_FilterQueryVariables
>;
export const Get_Pet_List_With_FilterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Pet_List_With_Filter" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "identificationNumber" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "petByIdentificationNumberList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "identificationNumber" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "identificationNumber" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "identificationNumber" },
                },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "type" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Get_Pet_List_With_FilterQuery,
  Get_Pet_List_With_FilterQueryVariables
>;
export const Delete_PetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Delete_Pet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Delete_PetMutation, Delete_PetMutationVariables>;
export const Get_PetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Pet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "identificationNumber" },
                },
                { kind: "Field", name: { kind: "Name", value: "birthDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "type" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "firstName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastName" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Get_PetQuery, Get_PetQueryVariables>;
export const Update_PetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Update_Pet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "PetInputDTO" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePet" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Update_PetMutation, Update_PetMutationVariables>;
export const Get_Scalars_ListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Scalars_List" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "scalarsTestEntityList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "intTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "intPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "byteTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "bytePrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "shortTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shortPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "doubleTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "doublePrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "floatTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "floatPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "string" } },
                { kind: "Field", name: { kind: "Name", value: "bool" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "boolPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "bigInt" } },
                { kind: "Field", name: { kind: "Name", value: "longTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "longPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "bigDecimal" } },
                { kind: "Field", name: { kind: "Name", value: "localDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "localDateTime" },
                },
                { kind: "Field", name: { kind: "Name", value: "localTime" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "offsetDateTime" },
                },
                { kind: "Field", name: { kind: "Name", value: "offsetTime" } },
                { kind: "Field", name: { kind: "Name", value: "dateTest" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Get_Scalars_ListQuery,
  Get_Scalars_ListQueryVariables
>;
export const Delete_ScalarsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Delete_Scalars" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteScalarsTestEntity" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Delete_ScalarsMutation,
  Delete_ScalarsMutationVariables
>;
export const Get_ScalarsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Get_Scalars" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "scalarsTestEntity" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "intTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "intPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "byteTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "bytePrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "shortTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shortPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "doubleTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "doublePrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "floatTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "floatPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "string" } },
                { kind: "Field", name: { kind: "Name", value: "bool" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "boolPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "bigInt" } },
                { kind: "Field", name: { kind: "Name", value: "longTest" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "longPrimitive" },
                },
                { kind: "Field", name: { kind: "Name", value: "bigDecimal" } },
                { kind: "Field", name: { kind: "Name", value: "localDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "localDateTime" },
                },
                { kind: "Field", name: { kind: "Name", value: "localTime" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "offsetDateTime" },
                },
                { kind: "Field", name: { kind: "Name", value: "offsetTime" } },
                { kind: "Field", name: { kind: "Name", value: "dateTest" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Get_ScalarsQuery, Get_ScalarsQueryVariables>;
export const Update_ScalarsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Update_Scalars" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "ScalarsTestEntityInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateScalarsTestEntity" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Update_ScalarsMutation,
  Update_ScalarsMutationVariables
>;
