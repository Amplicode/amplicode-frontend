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
  /** BigDecimal */
  BigDecimal: any;
  /** BigInteger */
  BigInteger: any;
  /** Date */
  Date: any;
  /** DateTime */
  DateTime: any;
  /** Time */
  Time: any;
  /** Void */
  Void: any;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  delete_Owner?: Maybe<Scalars["Void"]>;
  delete_Pet?: Maybe<Scalars["Void"]>;
  delete_PetType?: Maybe<Scalars["Void"]>;
  delete_Test?: Maybe<Scalars["Void"]>;
  delete_Visit?: Maybe<Scalars["Void"]>;
  update_Owner?: Maybe<OwnerDto>;
  update_Pet?: Maybe<PetDto>;
  update_PetType?: Maybe<PetTypeDto>;
  update_Test?: Maybe<TestDto>;
  update_Visit?: Maybe<VisitDto>;
};

/** Mutation root */
export type MutationDelete_OwnerArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Mutation root */
export type MutationDelete_PetArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Mutation root */
export type MutationDelete_PetTypeArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Mutation root */
export type MutationDelete_TestArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Mutation root */
export type MutationDelete_VisitArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Mutation root */
export type MutationUpdate_OwnerArgs = {
  input?: InputMaybe<OwnerInputDtoInput>;
};

/** Mutation root */
export type MutationUpdate_PetArgs = {
  input?: InputMaybe<PetInputDtoInput>;
};

/** Mutation root */
export type MutationUpdate_PetTypeArgs = {
  input?: InputMaybe<PetTypeInputDtoInput>;
};

/** Mutation root */
export type MutationUpdate_TestArgs = {
  input?: InputMaybe<TestInputDtoInput>;
};

/** Mutation root */
export type MutationUpdate_VisitArgs = {
  input?: InputMaybe<VisitInputDtoInput>;
};

export type OwnerDto = {
  __typename?: "OwnerDTO";
  address?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  lastName?: Maybe<Scalars["String"]>;
  telephone?: Maybe<Scalars["String"]>;
};

export type OwnerDtoInput = {
  address?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["BigInteger"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  telephone?: InputMaybe<Scalars["String"]>;
};

export type OwnerInputDtoInput = {
  address?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["BigInteger"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  telephone?: InputMaybe<Scalars["String"]>;
};

export type PetDto = {
  __typename?: "PetDTO";
  birthDate?: Maybe<Scalars["Date"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  identificationNumber?: Maybe<Scalars["String"]>;
  owner?: Maybe<OwnerDto>;
  type?: Maybe<PetTypeDto>;
};

export type PetDtoInput = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  id?: InputMaybe<Scalars["BigInteger"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
  type?: InputMaybe<PetTypeDtoInput>;
};

export type PetInputDtoInput = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  id?: InputMaybe<Scalars["BigInteger"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
  type?: InputMaybe<PetTypeDtoInput>;
};

export type PetTypeDto = {
  __typename?: "PetTypeDTO";
  id?: Maybe<Scalars["BigInteger"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PetTypeDtoInput = {
  id?: InputMaybe<Scalars["BigInteger"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type PetTypeInputDtoInput = {
  id?: InputMaybe<Scalars["BigInteger"]>;
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
  test?: Maybe<TestDto>;
  testList?: Maybe<Array<Maybe<TestDto>>>;
  visit?: Maybe<VisitDto>;
  visitList?: Maybe<Array<Maybe<VisitDto>>>;
};

/** Query root */
export type QueryOwnerArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Query root */
export type QueryPetArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Query root */
export type QueryPetTypeArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Query root */
export type QueryTestArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

/** Query root */
export type QueryVisitArgs = {
  id?: InputMaybe<Scalars["BigInteger"]>;
};

export type TestDto = {
  __typename?: "TestDTO";
  bigDecimal?: Maybe<Scalars["BigDecimal"]>;
  bigInt?: Maybe<Scalars["BigInteger"]>;
  bool?: Maybe<Scalars["Boolean"]>;
  boolPrimitive: Scalars["Boolean"];
  byteArray?: Maybe<Scalars["String"]>;
  bytePrimitive: Scalars["Int"];
  bytePrimitiveArray?: Maybe<Scalars["String"]>;
  byteTest?: Maybe<Scalars["Int"]>;
  calendar?: Maybe<Scalars["String"]>;
  charArray?: Maybe<Scalars["String"]>;
  charPrimitive: Scalars["String"];
  charPrimitiveArray?: Maybe<Scalars["String"]>;
  character?: Maybe<Scalars["String"]>;
  currency?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  dateUtil?: Maybe<Scalars["DateTime"]>;
  doubleTest?: Maybe<Scalars["Float"]>;
  duration?: Maybe<Scalars["String"]>;
  floatTest?: Maybe<Scalars["Float"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  instant?: Maybe<Scalars["String"]>;
  intTest?: Maybe<Scalars["Int"]>;
  localDate?: Maybe<Scalars["Date"]>;
  localDateTime?: Maybe<Scalars["DateTime"]>;
  localTime?: Maybe<Scalars["Time"]>;
  locale?: Maybe<Scalars["String"]>;
  longTest?: Maybe<Scalars["BigInteger"]>;
  offsetDateTime?: Maybe<Scalars["DateTime"]>;
  offsetTime?: Maybe<Scalars["Time"]>;
  shortPrimitive: Scalars["Int"];
  shortTest?: Maybe<Scalars["Int"]>;
  string?: Maybe<Scalars["String"]>;
  time?: Maybe<Scalars["String"]>;
  timeStamp?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  uuidTest?: Maybe<Scalars["String"]>;
  zonedDateTime?: Maybe<Scalars["DateTime"]>;
};

export type TestInputDtoInput = {
  bigDecimal?: InputMaybe<Scalars["BigDecimal"]>;
  bigInt?: InputMaybe<Scalars["BigInteger"]>;
  bool?: InputMaybe<Scalars["Boolean"]>;
  boolPrimitive: Scalars["Boolean"];
  byteArray?: InputMaybe<Scalars["String"]>;
  bytePrimitive: Scalars["Int"];
  bytePrimitiveArray?: InputMaybe<Scalars["String"]>;
  byteTest?: InputMaybe<Scalars["Int"]>;
  calendar?: InputMaybe<Scalars["String"]>;
  charArray?: InputMaybe<Scalars["String"]>;
  charPrimitive: Scalars["String"];
  charPrimitiveArray?: InputMaybe<Scalars["String"]>;
  character?: InputMaybe<Scalars["String"]>;
  currency?: InputMaybe<Scalars["String"]>;
  date?: InputMaybe<Scalars["String"]>;
  dateUtil?: InputMaybe<Scalars["DateTime"]>;
  doubleTest?: InputMaybe<Scalars["Float"]>;
  duration?: InputMaybe<Scalars["String"]>;
  floatTest?: InputMaybe<Scalars["Float"]>;
  id?: InputMaybe<Scalars["BigInteger"]>;
  instant?: InputMaybe<Scalars["String"]>;
  intTest?: InputMaybe<Scalars["Int"]>;
  localDate?: InputMaybe<Scalars["Date"]>;
  localDateTime?: InputMaybe<Scalars["DateTime"]>;
  localTime?: InputMaybe<Scalars["Time"]>;
  locale?: InputMaybe<Scalars["String"]>;
  longTest?: InputMaybe<Scalars["BigInteger"]>;
  offsetDateTime?: InputMaybe<Scalars["DateTime"]>;
  offsetTime?: InputMaybe<Scalars["Time"]>;
  shortPrimitive: Scalars["Int"];
  shortTest?: InputMaybe<Scalars["Int"]>;
  string?: InputMaybe<Scalars["String"]>;
  time?: InputMaybe<Scalars["String"]>;
  timeStamp?: InputMaybe<Scalars["String"]>;
  url?: InputMaybe<Scalars["String"]>;
  uuidTest?: InputMaybe<Scalars["String"]>;
  zonedDateTime?: InputMaybe<Scalars["DateTime"]>;
};

export type Visit = {
  __typename?: "Visit";
  getPet?: Maybe<PetDto>;
};

export type VisitDto = {
  __typename?: "VisitDTO";
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["BigInteger"]>;
  visitEnd?: Maybe<Scalars["DateTime"]>;
  visitStart?: Maybe<Scalars["DateTime"]>;
};

export type VisitInputDtoInput = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["BigInteger"]>;
  pet?: InputMaybe<PetDtoInput>;
  visitEnd?: InputMaybe<Scalars["DateTime"]>;
  visitStart?: InputMaybe<Scalars["DateTime"]>;
};

export type Owner_OwnerEditorQueryVariables = Exact<{
  id?: InputMaybe<Scalars["BigInteger"]>;
}>;

export type Owner_OwnerEditorQuery = {
  __typename?: "Query";
  owner?: {
    __typename?: "OwnerDTO";
    id?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
    address?: string | null;
    email?: string | null;
    telephone?: string | null;
  } | null;
};

export type Update_Owner_OwnerEditorMutationVariables = Exact<{
  input?: InputMaybe<OwnerInputDtoInput>;
}>;

export type Update_Owner_OwnerEditorMutation = {
  __typename?: "Mutation";
  update_Owner?: { __typename?: "OwnerDTO"; id?: any | null } | null;
};

export type OwnerList_OwnerListQueryVariables = Exact<{ [key: string]: never }>;

export type OwnerList_OwnerListQuery = {
  __typename?: "Query";
  ownerList?: Array<{
    __typename?: "OwnerDTO";
    id?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
  } | null> | null;
};

export type Delete_Owner_OwnerListMutationVariables = Exact<{
  id: Scalars["BigInteger"];
}>;

export type Delete_Owner_OwnerListMutation = {
  __typename?: "Mutation";
  delete_Owner?: any | null;
};

export type Pet_PetEditorQueryVariables = Exact<{
  id?: InputMaybe<Scalars["BigInteger"]>;
}>;

export type Pet_PetEditorQuery = {
  __typename?: "Query";
  pet?: {
    __typename?: "PetDTO";
    id?: any | null;
    identificationNumber?: string | null;
    owner?: {
      __typename?: "OwnerDTO";
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export type Update_Pet_PetEditorMutationVariables = Exact<{
  input?: InputMaybe<PetInputDtoInput>;
}>;

export type Update_Pet_PetEditorMutation = {
  __typename?: "Mutation";
  update_Pet?: { __typename?: "PetDTO"; id?: any | null } | null;
};

export type PetList_PetListQueryVariables = Exact<{ [key: string]: never }>;

export type PetList_PetListQuery = {
  __typename?: "Query";
  petList?: Array<{
    __typename?: "PetDTO";
    id?: any | null;
    identificationNumber?: string | null;
    owner?: {
      __typename?: "OwnerDTO";
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  } | null> | null;
};

export type Delete_Pet_PetListMutationVariables = Exact<{
  id: Scalars["BigInteger"];
}>;

export type Delete_Pet_PetListMutation = {
  __typename?: "Mutation";
  delete_Pet?: any | null;
};

export type Owner_ReadOnlyOwnerDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars["BigInteger"]>;
}>;

export type Owner_ReadOnlyOwnerDetailsQuery = {
  __typename?: "Query";
  owner?: {
    __typename?: "OwnerDTO";
    id?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
    address?: string | null;
    email?: string | null;
    telephone?: string | null;
  } | null;
};

export type OwnerList_ReadOnlyOwnerListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type OwnerList_ReadOnlyOwnerListQuery = {
  __typename?: "Query";
  ownerList?: Array<{
    __typename?: "OwnerDTO";
    id?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
  } | null> | null;
};

export type OwnerList_StandaloneOwnerListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type OwnerList_StandaloneOwnerListQuery = {
  __typename?: "Query";
  ownerList?: Array<{
    __typename?: "OwnerDTO";
    id?: any | null;
    firstName?: string | null;
    lastName?: string | null;
    city?: string | null;
  } | null> | null;
};

export type Delete_Owner_StandaloneOwnerListMutationVariables = Exact<{
  id: Scalars["BigInteger"];
}>;

export type Delete_Owner_StandaloneOwnerListMutation = {
  __typename?: "Mutation";
  delete_Owner?: any | null;
};

export const Owner_OwnerEditorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Owner_OwnerEditor" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "BigInteger" },
          },
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
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "telephone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Owner_OwnerEditorQuery,
  Owner_OwnerEditorQueryVariables
>;
export const Update_Owner_OwnerEditorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Update_Owner_OwnerEditor" },
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
            name: { kind: "Name", value: "update_Owner" },
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
  Update_Owner_OwnerEditorMutation,
  Update_Owner_OwnerEditorMutationVariables
>;
export const OwnerList_OwnerListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "OwnerList_OwnerList" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OwnerList_OwnerListQuery,
  OwnerList_OwnerListQueryVariables
>;
export const Delete_Owner_OwnerListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Delete_Owner_OwnerList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BigInteger" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "delete_Owner" },
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
  Delete_Owner_OwnerListMutation,
  Delete_Owner_OwnerListMutationVariables
>;
export const Pet_PetEditorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Pet_PetEditor" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "BigInteger" },
          },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
} as unknown as DocumentNode<Pet_PetEditorQuery, Pet_PetEditorQueryVariables>;
export const Update_Pet_PetEditorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Update_Pet_PetEditor" },
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
            name: { kind: "Name", value: "update_Pet" },
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
  Update_Pet_PetEditorMutation,
  Update_Pet_PetEditorMutationVariables
>;
export const PetList_PetListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PetList_PetList" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
  PetList_PetListQuery,
  PetList_PetListQueryVariables
>;
export const Delete_Pet_PetListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Delete_Pet_PetList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BigInteger" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "delete_Pet" },
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
  Delete_Pet_PetListMutation,
  Delete_Pet_PetListMutationVariables
>;
export const Owner_ReadOnlyOwnerDetailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Owner_ReadOnlyOwnerDetails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "BigInteger" },
          },
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
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "telephone" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Owner_ReadOnlyOwnerDetailsQuery,
  Owner_ReadOnlyOwnerDetailsQueryVariables
>;
export const OwnerList_ReadOnlyOwnerListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "OwnerList_ReadOnlyOwnerList" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OwnerList_ReadOnlyOwnerListQuery,
  OwnerList_ReadOnlyOwnerListQueryVariables
>;
export const OwnerList_StandaloneOwnerListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "OwnerList_StandaloneOwnerList" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OwnerList_StandaloneOwnerListQuery,
  OwnerList_StandaloneOwnerListQueryVariables
>;
export const Delete_Owner_StandaloneOwnerListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Delete_Owner_StandaloneOwnerList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BigInteger" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "delete_Owner" },
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
  Delete_Owner_StandaloneOwnerListMutation,
  Delete_Owner_StandaloneOwnerListMutationVariables
>;
