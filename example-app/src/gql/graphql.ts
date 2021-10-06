/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Base64-encoded binary */
  Base64String: any;
  /** Base64-encoded binary */
  Base64String_Byte: any;
  /** Built-in java.math.BigDecimal */
  BigDecimal: any;
  /** Built-in java.math.BigInteger */
  BigInteger: any;
  /** Built-in Byte as Int */
  Byte: any;
  /** Built-in scalar representing a date-time with a time-zone */
  Calendar: any;
  /** Built-in Char as Character */
  Char: any;
  /** Built-in scalar representing an instant in time */
  Date: any;
  /** Built-in scalar representing an amount of time */
  Duration: any;
  /** Built-in scalar representing an instant in time */
  Instant: any;
  /** Built-in scalar representing a local date */
  LocalDate: any;
  /** Built-in scalar representing a local date-time */
  LocalDateTime: any;
  /** Built-in scalar representing a local time */
  LocalTime: any;
  /** Built-in Locale */
  Locale: any;
  /** Long type */
  Long: any;
  /** Built-in scalar representing a date-time with a UTC offset */
  OffsetDateTime: any;
  /** Built-in scalar representing a time with a UTC offset */
  OffsetTime: any;
  /** Built-in Short as Int */
  Short: any;
  /** Built-in scalar representing a SQL compliant local date */
  SqlDate: any;
  /** Built-in scalar representing a SQL compliant local time */
  SqlTime: any;
  /** Built-in scalar representing a SQL compliant local date-time */
  SqlTimestamp: any;
  /** Use SPQR's SchemaPrinter to remove this from SDL */
  UNREPRESENTABLE: any;
  /** URL String */
  URL: any;
  /** UUID String */
  UUID: any;
  /** Built-in scalar representing a date-time with a time-zone */
  ZonedDateTime: any;
  /** Currency Type */
  currency: any;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  delete_Owner: Scalars['Boolean'];
  delete_Pet: Scalars['Boolean'];
  delete_PetType: Scalars['Boolean'];
  delete_Test: Scalars['Boolean'];
  delete_Visit: Scalars['Boolean'];
  update_Owner?: Maybe<OwnerDto>;
  update_Pet?: Maybe<PetDto>;
  update_PetType?: Maybe<PetTypeDto>;
  update_Test?: Maybe<TestDto>;
  update_Visit?: Maybe<VisitDto>;
};


/** Mutation root */
export type MutationDelete_OwnerArgs = {
  id: Scalars['Long'];
};


/** Mutation root */
export type MutationDelete_PetArgs = {
  id: Scalars['Long'];
};


/** Mutation root */
export type MutationDelete_PetTypeArgs = {
  id: Scalars['Long'];
};


/** Mutation root */
export type MutationDelete_TestArgs = {
  id: Scalars['Long'];
};


/** Mutation root */
export type MutationDelete_VisitArgs = {
  id: Scalars['Long'];
};


/** Mutation root */
export type MutationUpdate_OwnerArgs = {
  input?: Maybe<OwnerInputDtoInput>;
};


/** Mutation root */
export type MutationUpdate_PetArgs = {
  input?: Maybe<PetInputDtoInput>;
};


/** Mutation root */
export type MutationUpdate_PetTypeArgs = {
  input?: Maybe<PetTypeInputDtoInput>;
};


/** Mutation root */
export type MutationUpdate_TestArgs = {
  input?: Maybe<TestInputDtoInput>;
};


/** Mutation root */
export type MutationUpdate_VisitArgs = {
  input?: Maybe<VisitInputDtoInput>;
};

export type OwnerDto = {
  __typename?: 'OwnerDTO';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  lastName?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
};

export type OwnerDtoInput = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  lastName?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
};

export type OwnerInputDtoInput = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  lastName?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
};

export type PetDto = {
  __typename?: 'PetDTO';
  birthDate?: Maybe<Scalars['LocalDate']>;
  id?: Maybe<Scalars['Long']>;
  identificationNumber?: Maybe<Scalars['String']>;
  owner?: Maybe<OwnerDto>;
  type?: Maybe<PetTypeDto>;
};

export type PetDtoInput = {
  birthDate?: Maybe<Scalars['LocalDate']>;
  id?: Maybe<Scalars['Long']>;
  identificationNumber?: Maybe<Scalars['String']>;
  owner?: Maybe<OwnerDtoInput>;
  type?: Maybe<PetTypeDtoInput>;
};

export type PetInputDtoInput = {
  birthDate?: Maybe<Scalars['LocalDate']>;
  id?: Maybe<Scalars['Long']>;
  identificationNumber?: Maybe<Scalars['String']>;
  owner?: Maybe<OwnerDtoInput>;
  type?: Maybe<PetTypeDtoInput>;
};

export type PetTypeDto = {
  __typename?: 'PetTypeDTO';
  id?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
};

export type PetTypeDtoInput = {
  id?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
};

export type PetTypeInputDtoInput = {
  id?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
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
  id?: Maybe<Scalars['Long']>;
};


/** Query root */
export type QueryPetArgs = {
  id?: Maybe<Scalars['Long']>;
};


/** Query root */
export type QueryPetTypeArgs = {
  id?: Maybe<Scalars['Long']>;
};


/** Query root */
export type QueryTestArgs = {
  id?: Maybe<Scalars['Long']>;
};


/** Query root */
export type QueryVisitArgs = {
  id?: Maybe<Scalars['Long']>;
};

export type TestDto = {
  __typename?: 'TestDTO';
  bigDecimal?: Maybe<Scalars['BigDecimal']>;
  bigInt?: Maybe<Scalars['BigInteger']>;
  bool?: Maybe<Scalars['Boolean']>;
  boolPrimitive: Scalars['Boolean'];
  byteArray?: Maybe<Scalars['Base64String_Byte']>;
  bytePrimitive: Scalars['Byte'];
  bytePrimitiveArray?: Maybe<Scalars['Base64String']>;
  byteTest?: Maybe<Scalars['Byte']>;
  calendar?: Maybe<Scalars['Calendar']>;
  charArray?: Maybe<Array<Maybe<Scalars['Char']>>>;
  charPrimitive: Scalars['Char'];
  charPrimitiveArray?: Maybe<Array<Maybe<Scalars['Char']>>>;
  character?: Maybe<Scalars['Char']>;
  currency?: Maybe<Scalars['currency']>;
  date?: Maybe<Scalars['SqlDate']>;
  dateUtil?: Maybe<Scalars['Date']>;
  doubleTest?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Duration']>;
  floatTest?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Long']>;
  instant?: Maybe<Scalars['Instant']>;
  intTest?: Maybe<Scalars['Int']>;
  localDate?: Maybe<Scalars['LocalDate']>;
  localDateTime?: Maybe<Scalars['LocalDateTime']>;
  localTime?: Maybe<Scalars['LocalTime']>;
  locale?: Maybe<Scalars['Locale']>;
  longTest?: Maybe<Scalars['Long']>;
  offsetDateTime?: Maybe<Scalars['OffsetDateTime']>;
  offsetTime?: Maybe<Scalars['OffsetTime']>;
  shortPrimitive: Scalars['Short'];
  shortTest?: Maybe<Scalars['Short']>;
  string?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['SqlTime']>;
  timeStamp?: Maybe<Scalars['SqlTimestamp']>;
  url?: Maybe<Scalars['URL']>;
  uuidTest?: Maybe<Scalars['UUID']>;
  zonedDateTime?: Maybe<Scalars['ZonedDateTime']>;
};

export type TestInputDtoInput = {
  bigDecimal?: Maybe<Scalars['BigDecimal']>;
  bigInt?: Maybe<Scalars['BigInteger']>;
  bool?: Maybe<Scalars['Boolean']>;
  boolPrimitive: Scalars['Boolean'];
  byteArray?: Maybe<Scalars['Base64String_Byte']>;
  bytePrimitive: Scalars['Byte'];
  bytePrimitiveArray?: Maybe<Scalars['Base64String']>;
  byteTest?: Maybe<Scalars['Byte']>;
  calendar?: Maybe<Scalars['Calendar']>;
  charArray?: Maybe<Array<Maybe<Scalars['Char']>>>;
  charPrimitive: Scalars['Char'];
  charPrimitiveArray?: Maybe<Array<Maybe<Scalars['Char']>>>;
  character?: Maybe<Scalars['Char']>;
  currency?: Maybe<Scalars['currency']>;
  date?: Maybe<Scalars['SqlDate']>;
  dateUtil?: Maybe<Scalars['Date']>;
  doubleTest?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Duration']>;
  floatTest?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Long']>;
  instant?: Maybe<Scalars['Instant']>;
  intTest?: Maybe<Scalars['Int']>;
  localDate?: Maybe<Scalars['LocalDate']>;
  localDateTime?: Maybe<Scalars['LocalDateTime']>;
  localTime?: Maybe<Scalars['LocalTime']>;
  locale?: Maybe<Scalars['Locale']>;
  longTest?: Maybe<Scalars['Long']>;
  offsetDateTime?: Maybe<Scalars['OffsetDateTime']>;
  offsetTime?: Maybe<Scalars['OffsetTime']>;
  shortPrimitive: Scalars['Short'];
  shortTest?: Maybe<Scalars['Short']>;
  string?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['SqlTime']>;
  timeStamp?: Maybe<Scalars['SqlTimestamp']>;
  url?: Maybe<Scalars['URL']>;
  uuidTest?: Maybe<Scalars['UUID']>;
  zonedDateTime?: Maybe<Scalars['ZonedDateTime']>;
};

export type VisitDto = {
  __typename?: 'VisitDTO';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  pet?: Maybe<PetDto>;
  visitEnd?: Maybe<Scalars['LocalDateTime']>;
  visitStart?: Maybe<Scalars['LocalDateTime']>;
};

export type VisitInputDtoInput = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Long']>;
  pet?: Maybe<PetDtoInput>;
  visitEnd?: Maybe<Scalars['LocalDateTime']>;
  visitStart?: Maybe<Scalars['LocalDateTime']>;
};

export type OwnerEditor__Get_OwnerQueryVariables = Exact<{
  id?: Maybe<Scalars['Long']>;
}>;


export type OwnerEditor__Get_OwnerQuery = { __typename?: 'Query', owner?: { __typename?: 'OwnerDTO', id?: any | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, city?: string | null | undefined, address?: string | null | undefined } | null | undefined };

export type Update_OwnerMutationVariables = Exact<{
  input?: Maybe<OwnerInputDtoInput>;
}>;


export type Update_OwnerMutation = { __typename?: 'Mutation', update_Owner?: { __typename?: 'OwnerDTO', id?: any | null | undefined } | null | undefined };

export type New_OwnerDtoFragment = { __typename?: 'OwnerDTO', id?: any | null | undefined };

export type Get_Owner_ListQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Owner_ListQuery = { __typename?: 'Query', ownerList?: Array<{ __typename?: 'OwnerDTO', id?: any | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, city?: string | null | undefined } | null | undefined> | null | undefined };

export type Delete_OwnerMutationVariables = Exact<{
  id: Scalars['Long'];
}>;


export type Delete_OwnerMutation = { __typename?: 'Mutation', delete_Owner: boolean };

export type Get_Pet_ListQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Pet_ListQuery = { __typename?: 'Query', petList?: Array<{ __typename?: 'PetDTO', id?: any | null | undefined, identificationNumber?: string | null | undefined, owner?: { __typename?: 'OwnerDTO', firstName?: string | null | undefined, lastName?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type Delete_PetMutationVariables = Exact<{
  id: Scalars['Long'];
}>;


export type Delete_PetMutation = { __typename?: 'Mutation', delete_Pet: boolean };

export type Get_PetQueryVariables = Exact<{
  id?: Maybe<Scalars['Long']>;
}>;


export type Get_PetQuery = { __typename?: 'Query', pet?: { __typename?: 'PetDTO', id?: any | null | undefined, identificationNumber?: string | null | undefined, owner?: { __typename?: 'OwnerDTO', firstName?: string | null | undefined, lastName?: string | null | undefined } | null | undefined } | null | undefined };

export type Update_PetMutationVariables = Exact<{
  input?: Maybe<PetInputDtoInput>;
}>;


export type Update_PetMutation = { __typename?: 'Mutation', update_Pet?: { __typename?: 'PetDTO', id?: any | null | undefined } | null | undefined };

export type New_PetDtoFragment = { __typename?: 'PetDTO', id?: any | null | undefined };

export type Get_OwnerQueryVariables = Exact<{
  id?: Maybe<Scalars['Long']>;
}>;


export type Get_OwnerQuery = { __typename?: 'Query', owner?: { __typename?: 'OwnerDTO', id?: any | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, city?: string | null | undefined, address?: string | null | undefined, email?: string | null | undefined, telephone?: string | null | undefined } | null | undefined };

export const New_OwnerDtoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"New_OwnerDTO"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OwnerDTO"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<New_OwnerDtoFragment, unknown>;
export const New_PetDtoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"New_PetDTO"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PetDTO"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<New_PetDtoFragment, unknown>;
export const OwnerEditor__Get_OwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OwnerEditor__Get_Owner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<OwnerEditor__Get_OwnerQuery, OwnerEditor__Get_OwnerQueryVariables>;
export const Update_OwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Update_Owner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OwnerInputDTOInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_Owner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Update_OwnerMutation, Update_OwnerMutationVariables>;
export const Get_Owner_ListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Get_Owner_List"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}}]} as unknown as DocumentNode<Get_Owner_ListQuery, Get_Owner_ListQueryVariables>;
export const Delete_OwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete_Owner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_Owner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<Delete_OwnerMutation, Delete_OwnerMutationVariables>;
export const Get_Pet_ListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Get_Pet_List"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"petList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<Get_Pet_ListQuery, Get_Pet_ListQueryVariables>;
export const Delete_PetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Delete_Pet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_Pet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<Delete_PetMutation, Delete_PetMutationVariables>;
export const Get_PetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Get_Pet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identificationNumber"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<Get_PetQuery, Get_PetQueryVariables>;
export const Update_PetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Update_Pet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PetInputDTOInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_Pet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<Update_PetMutation, Update_PetMutationVariables>;
export const Get_OwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Get_Owner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}}]}}]}}]} as unknown as DocumentNode<Get_OwnerQuery, Get_OwnerQueryVariables>;