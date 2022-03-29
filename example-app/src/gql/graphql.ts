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
  deletePetType?: Maybe<Scalars["Void"]>;
  deleteVisit?: Maybe<Scalars["Void"]>;
  updateOwner?: Maybe<OwnerDto>;
  updatePet?: Maybe<PetDto>;
  updatePetType?: Maybe<PetTypeDto>;
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
export type MutationDeletePetTypeArgs = {
  id: Scalars["ID"];
};

/** Mutation root */
export type MutationDeleteVisitArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Mutation root */
export type MutationUpdateOwnerArgs = {
  input?: InputMaybe<OwnerInputDtoInput>;
};

/** Mutation root */
export type MutationUpdatePetArgs = {
  input?: InputMaybe<PetInputDtoInput>;
};

/** Mutation root */
export type MutationUpdatePetTypeArgs = {
  input?: InputMaybe<PetTypeInputDtoInput>;
};

/** Mutation root */
export type MutationUpdateVisitArgs = {
  input?: InputMaybe<VisitInputDtoInput>;
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

export type OwnerInputDtoInput = {
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
  type?: Maybe<PetTypeDto>;
};

export type PetDtoInput = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  id?: InputMaybe<Scalars["ID"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
  type?: InputMaybe<PetTypeDtoInput>;
};

export type PetInputDtoInput = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  id?: InputMaybe<Scalars["ID"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
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

export type PetTypeInputDtoInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

/** Query root */
export type Query = {
  __typename?: "Query";
  owner?: Maybe<OwnerDto>;
  ownerList?: Maybe<Array<Maybe<OwnerDto>>>;
  pet?: Maybe<PetDto>;
  petList?: Maybe<Array<Maybe<PetDto>>>;
  petType?: Maybe<PetTypeDto>;
  petTypeList?: Maybe<Array<Maybe<PetTypeDto>>>;
  userInfo?: Maybe<UserInfo>;
  visit?: Maybe<VisitDto>;
  visitList?: Maybe<Array<Maybe<VisitDto>>>;
};

/** Query root */
export type QueryOwnerArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryPetArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryPetTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

/** Query root */
export type QueryVisitArgs = {
  id?: InputMaybe<Scalars["ID"]>;
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

export type VisitInputDtoInput = {
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
  input?: InputMaybe<OwnerInputDtoInput>;
}>;

export type Update_OwnerMutation = {
  __typename?: "Mutation";
  updateOwner?: { __typename?: "OwnerDTO"; id?: string | null } | null;
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
  input?: InputMaybe<PetInputDtoInput>;
}>;

export type Update_PetMutation = {
  __typename?: "Mutation";
  updatePet?: { __typename?: "PetDTO"; id?: string | null } | null;
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
            name: { kind: "Name", value: "OwnerInputDTOInput" },
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
            name: { kind: "Name", value: "PetInputDTOInput" },
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
