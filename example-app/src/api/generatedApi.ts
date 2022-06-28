import { api } from "./baseApi";
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
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type ConnectionCursor = {
  __typename?: "ConnectionCursor";
  value?: Maybe<Scalars["String"]>;
};

export type CursorPageInput = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first: Scalars["Int"];
  last: Scalars["Int"];
};

export enum Direction {
  Asc = "ASC",
  Desc = "DESC",
}

export type Mutation = {
  __typename?: "Mutation";
  deleteNotNullScalarsTestEntity?: Maybe<Scalars["Void"]>;
  deleteOwner?: Maybe<Scalars["Void"]>;
  deletePet?: Maybe<Scalars["Void"]>;
  deletePetDescription?: Maybe<Scalars["Void"]>;
  deletePetDisease?: Maybe<Scalars["Void"]>;
  deletePetType?: Maybe<Scalars["Void"]>;
  deleteScalarsTestEntity?: Maybe<Scalars["Void"]>;
  deleteTag?: Maybe<Scalars["Void"]>;
  deleteTestEntity: Scalars["Boolean"];
  deleteVisit?: Maybe<Scalars["Void"]>;
  updateNotNullScalarsTestEntity?: Maybe<NotNullScalarsTestEntity>;
  updateOwner?: Maybe<OwnerDto>;
  updatePet?: Maybe<PetDto>;
  updatePetDescription?: Maybe<PetDescriptionDto>;
  updatePetDisease?: Maybe<PetDiseaseDto>;
  updatePetType?: Maybe<PetTypeDto>;
  updateScalarsTestEntity?: Maybe<ScalarsTestEntity>;
  updateTag?: Maybe<TagDto>;
  updateTestEntity?: Maybe<TestEntity>;
  updateVisit?: Maybe<VisitDto>;
};

export type MutationDeleteNotNullScalarsTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationDeleteOwnerArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePetArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePetDescriptionArgs = {
  identifier?: InputMaybe<Scalars["ID"]>;
};

export type MutationDeletePetDiseaseArgs = {
  petDiseaseIdentifier?: InputMaybe<Scalars["ID"]>;
};

export type MutationDeletePetTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteScalarsTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationDeleteTagArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationDeleteTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationDeleteVisitArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type MutationUpdateNotNullScalarsTestEntityArgs = {
  input?: InputMaybe<NotNullScalarsTestEntityInput>;
};

export type MutationUpdateOwnerArgs = {
  input?: InputMaybe<OwnerInputDto>;
};

export type MutationUpdatePetArgs = {
  input?: InputMaybe<PetInputDto>;
};

export type MutationUpdatePetDescriptionArgs = {
  input?: InputMaybe<PetDescriptionInputDto>;
};

export type MutationUpdatePetDiseaseArgs = {
  input?: InputMaybe<PetDiseaseInputDto>;
};

export type MutationUpdatePetTypeArgs = {
  input?: InputMaybe<PetTypeInputDto>;
};

export type MutationUpdateScalarsTestEntityArgs = {
  input?: InputMaybe<ScalarsTestEntityInput>;
};

export type MutationUpdateTagArgs = {
  input?: InputMaybe<TagInputDto>;
};

export type MutationUpdateTestEntityArgs = {
  input?: InputMaybe<TestEntityInput>;
};

export type MutationUpdateVisitArgs = {
  input?: InputMaybe<VisitInputDto>;
};

export type NotNullScalarsTestEntity = {
  __typename?: "NotNullScalarsTestEntity";
  bigDecimalNotNull: Scalars["BigDecimal"];
  bigIntNotNull: Scalars["BigInteger"];
  dateTestNotNull: Scalars["Timestamp"];
  id?: Maybe<Scalars["ID"]>;
  localDateNotNull: Scalars["Date"];
  localDateTimeNotNull: Scalars["LocalDateTime"];
  localTimeNotNull: Scalars["LocalTime"];
  offsetDateTimeNotNull: Scalars["DateTime"];
  offsetTimeNotNull: Scalars["Time"];
  stringNotNull: Scalars["String"];
  urlNotNull: Scalars["Url"];
};

export type NotNullScalarsTestEntityInput = {
  bigDecimalNotNull: Scalars["BigDecimal"];
  bigIntNotNull: Scalars["BigInteger"];
  dateTestNotNull: Scalars["Timestamp"];
  id?: InputMaybe<Scalars["ID"]>;
  localDateNotNull: Scalars["Date"];
  localDateTimeNotNull: Scalars["LocalDateTime"];
  localTimeNotNull: Scalars["LocalTime"];
  offsetDateTimeNotNull: Scalars["DateTime"];
  offsetTimeNotNull: Scalars["Time"];
  stringNotNull: Scalars["String"];
  urlNotNull: Scalars["Url"];
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export type OwnerConnection = {
  __typename?: "OwnerConnection";
  edges?: Maybe<Array<Maybe<OwnerEdge>>>;
  pageInfo?: Maybe<PageInfo>;
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

export type OwnerEdge = {
  __typename?: "OwnerEdge";
  cursor?: Maybe<ConnectionCursor>;
  node?: Maybe<OwnerDto>;
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

export type OwnerOrderByInput = {
  direction?: InputMaybe<Direction>;
  property?: InputMaybe<OwnerOrderByProperty>;
};

export enum OwnerOrderByProperty {
  City = "CITY",
  FirstName = "FIRST_NAME",
  LastName = "LAST_NAME",
}

export type OwnerPage = {
  __typename?: "OwnerPage";
  content?: Maybe<Array<Maybe<OwnerDto>>>;
  totalElements: Scalars["Long"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<ConnectionCursor>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<ConnectionCursor>;
};

export type PetDto = {
  __typename?: "PetDTO";
  birthDate?: Maybe<Scalars["Date"]>;
  description?: Maybe<PetDescriptionDto>;
  diseases?: Maybe<Array<Maybe<PetDiseaseDto>>>;
  id?: Maybe<Scalars["ID"]>;
  identificationNumber?: Maybe<Scalars["String"]>;
  owner?: Maybe<OwnerDto>;
  tags?: Maybe<Array<Maybe<TagDto>>>;
  type?: Maybe<PetTypeDto>;
};

export type PetDtoInput = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  description?: InputMaybe<PetDescriptionDtoInput>;
  diseases?: InputMaybe<Array<InputMaybe<PetDiseaseDtoInput>>>;
  id?: InputMaybe<Scalars["ID"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
  tags?: InputMaybe<Array<InputMaybe<TagDtoInput>>>;
  type?: InputMaybe<PetTypeDtoInput>;
};

export type PetDescriptionDto = {
  __typename?: "PetDescriptionDTO";
  description?: Maybe<Scalars["String"]>;
  identifier?: Maybe<Scalars["ID"]>;
};

export type PetDescriptionDtoInput = {
  description?: InputMaybe<Scalars["String"]>;
  identifier?: InputMaybe<Scalars["ID"]>;
};

export type PetDescriptionInputDto = {
  description?: InputMaybe<Scalars["String"]>;
  identifier?: InputMaybe<Scalars["ID"]>;
};

export type PetDiseaseDto = {
  __typename?: "PetDiseaseDTO";
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  petDiseaseIdentifier?: Maybe<Scalars["ID"]>;
};

export type PetDiseaseDtoInput = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  petDiseaseIdentifier?: InputMaybe<Scalars["ID"]>;
};

export type PetDiseaseInputDto = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  petDiseaseIdentifier?: InputMaybe<Scalars["ID"]>;
};

export type PetInputDto = {
  birthDate?: InputMaybe<Scalars["Date"]>;
  description?: InputMaybe<PetDescriptionDtoInput>;
  diseases?: InputMaybe<Array<InputMaybe<PetDiseaseDtoInput>>>;
  id?: InputMaybe<Scalars["ID"]>;
  identificationNumber?: InputMaybe<Scalars["String"]>;
  owner?: InputMaybe<OwnerDtoInput>;
  tags?: InputMaybe<Array<InputMaybe<TagDtoInput>>>;
  type?: InputMaybe<PetTypeDtoInput>;
};

export type PetTypeDto = {
  __typename?: "PetTypeDTO";
  defenseStatus?: Maybe<ProtectionStatus>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type PetTypeDtoInput = {
  defenseStatus?: InputMaybe<ProtectionStatus>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type PetTypeInputDto = {
  defenseStatus?: InputMaybe<ProtectionStatus>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export enum ProtectionStatus {
  NeedsProtection = "NEEDS_PROTECTION",
  NoDanger = "NO_DANGER",
  RedBook = "RED_BOOK",
}

export type Query = {
  __typename?: "Query";
  notNullScalarsTestEntity?: Maybe<NotNullScalarsTestEntity>;
  notNullScalarsTestEntityList?: Maybe<Array<Maybe<NotNullScalarsTestEntity>>>;
  owner?: Maybe<OwnerDto>;
  ownerByNamesList?: Maybe<Array<Maybe<OwnerDto>>>;
  ownerByNamesSeparateMethodsList?: Maybe<Array<Maybe<OwnerDto>>>;
  ownerList?: Maybe<Array<Maybe<OwnerDto>>>;
  ownerListByNamesFilter?: Maybe<Array<Maybe<OwnerDto>>>;
  ownerListByNamesFilterOffsetPage?: Maybe<OwnerPage>;
  ownerListByNamesFilterOffsetPageSorted?: Maybe<OwnerPage>;
  ownerListByNamesFilterSorted?: Maybe<Array<Maybe<OwnerDto>>>;
  ownerListFilterCursorPageSorted?: Maybe<OwnerConnection>;
  ownerListOffsetPage?: Maybe<OwnerPage>;
  ownerListOffsetPageSorted?: Maybe<OwnerPage>;
  ownerListSorted?: Maybe<Array<Maybe<OwnerDto>>>;
  pet?: Maybe<PetDto>;
  petByIdentificationNumberList?: Maybe<Array<Maybe<PetDto>>>;
  petDescription?: Maybe<PetDescriptionDto>;
  petDescriptionList?: Maybe<Array<Maybe<PetDescriptionDto>>>;
  petDisease?: Maybe<PetDiseaseDto>;
  petDiseaseList?: Maybe<Array<Maybe<PetDiseaseDto>>>;
  petList?: Maybe<Array<Maybe<PetDto>>>;
  petListByTypeId?: Maybe<Array<Maybe<PetDto>>>;
  petType?: Maybe<PetTypeDto>;
  petTypeList?: Maybe<Array<Maybe<PetTypeDto>>>;
  scalarsTestEntity?: Maybe<ScalarsTestEntity>;
  scalarsTestEntityList?: Maybe<Array<Maybe<ScalarsTestEntity>>>;
  tag?: Maybe<TagDto>;
  tagList?: Maybe<Array<Maybe<TagDto>>>;
  testEntity?: Maybe<TestEntity>;
  testEntityByIdsList?: Maybe<Array<Maybe<TestEntity>>>;
  testEntityList?: Maybe<Array<Maybe<TestEntity>>>;
  userInfo?: Maybe<UserInfo>;
  visit?: Maybe<VisitDto>;
  visitFilteredList?: Maybe<Array<Maybe<VisitDto>>>;
  visitList?: Maybe<Array<Maybe<VisitDto>>>;
};

export type QueryNotNullScalarsTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryOwnerArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryOwnerByNamesListArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
};

export type QueryOwnerByNamesSeparateMethodsListArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
};

export type QueryOwnerListByNamesFilterArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
};

export type QueryOwnerListByNamesFilterOffsetPageArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
};

export type QueryOwnerListByNamesFilterOffsetPageSortedArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<OwnerOrderByInput>>>;
};

export type QueryOwnerListByNamesFilterSortedArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
  sort?: InputMaybe<Array<InputMaybe<OwnerOrderByInput>>>;
};

export type QueryOwnerListFilterCursorPageSortedArgs = {
  filter?: InputMaybe<OwnerFilterInput>;
  page?: InputMaybe<CursorPageInput>;
  sort?: InputMaybe<Array<InputMaybe<OwnerOrderByInput>>>;
};

export type QueryOwnerListOffsetPageArgs = {
  page?: InputMaybe<OffsetPageInput>;
};

export type QueryOwnerListOffsetPageSortedArgs = {
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<OwnerOrderByInput>>>;
};

export type QueryOwnerListSortedArgs = {
  sort?: InputMaybe<Array<InputMaybe<OwnerOrderByInput>>>;
};

export type QueryPetArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryPetByIdentificationNumberListArgs = {
  identificationNumber?: InputMaybe<Scalars["String"]>;
};

export type QueryPetDescriptionArgs = {
  identifier?: InputMaybe<Scalars["ID"]>;
};

export type QueryPetDiseaseArgs = {
  petDiseaseIdentifier?: InputMaybe<Scalars["ID"]>;
};

export type QueryPetListByTypeIdArgs = {
  typeId: Scalars["ID"];
};

export type QueryPetTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryScalarsTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTagArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTestEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTestEntityByIdsListArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type QueryVisitArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryVisitFilteredListArgs = {
  filter?: InputMaybe<VisitFilterInput>;
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

export type TestEntity = {
  __typename?: "TestEntity";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type TestEntityInput = {
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

export type VisitFilterInput = {
  ownerFirstName?: InputMaybe<Scalars["String"]>;
  ownerLastName?: InputMaybe<Scalars["String"]>;
  petIdentificationNumber?: InputMaybe<Scalars["String"]>;
  visitStartAfter?: InputMaybe<Scalars["LocalDateTime"]>;
  visitStartBefore?: InputMaybe<Scalars["LocalDateTime"]>;
};

export type VisitInputDto = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  pet?: InputMaybe<PetDtoInput>;
  visitEnd?: InputMaybe<Scalars["LocalDateTime"]>;
  visitStart?: InputMaybe<Scalars["LocalDateTime"]>;
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type UserInfoQuery = {
  __typename?: "Query";
  userInfo?: { __typename?: "UserInfo"; username?: string | null } | null;
};

export type GetOwnerListQueryVariables = Exact<{ [key: string]: never }>;

export type GetOwnerListQuery = {
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

export type DeleteOwnerMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteOwnerMutation = {
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

export type GetPetListWithFilterQueryVariables = Exact<{
  identificationNumber?: InputMaybe<Scalars["String"]>;
}>;

export type GetPetListWithFilterQuery = {
  __typename?: "Query";
  petByIdentificationNumberList?: Array<{
    __typename: "PetDTO";
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
    description?: {
      __typename?: "PetDescriptionDTO";
      identifier?: string | null;
      description?: string | null;
    } | null;
    tags?: Array<{
      __typename?: "TagDTO";
      id?: string | null;
      name?: string | null;
    } | null> | null;
    diseases?: Array<{
      __typename?: "PetDiseaseDTO";
      petDiseaseIdentifier?: string | null;
      name?: string | null;
      description?: string | null;
    } | null> | null;
  } | null> | null;
};

export type DeletePetMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeletePetMutation = {
  __typename?: "Mutation";
  deletePet?: any | null;
};

export type GetPetQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type GetPetQuery = {
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
    description?: {
      __typename?: "PetDescriptionDTO";
      identifier?: string | null;
      description?: string | null;
    } | null;
    tags?: Array<{
      __typename?: "TagDTO";
      id?: string | null;
      name?: string | null;
    } | null> | null;
    diseases?: Array<{
      __typename?: "PetDiseaseDTO";
      petDiseaseIdentifier?: string | null;
      name?: string | null;
      description?: string | null;
    } | null> | null;
  } | null;
};

export type UpdatePetMutationVariables = Exact<{
  input?: InputMaybe<PetInputDto>;
}>;

export type UpdatePetMutation = {
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
    url?: any | null;
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
    url?: any | null;
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

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never }>;

export type Unnamed_1_Query = {
  __typename?: "Query";
  userInfo?: { __typename?: "UserInfo"; username?: string | null } | null;
};

export const UserInfoDocument = `
    query UserInfo {
  userInfo {
    username
  }
}
    `;
export const GetOwnerListDocument = `
    query GetOwnerList {
  ownerList {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}
    `;
export const DeleteOwnerDocument = `
    mutation DeleteOwner($id: ID!) {
  deleteOwner(id: $id)
}
    `;
export const Get_OwnerDocument = `
    query Get_Owner($id: ID) {
  owner(id: $id) {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}
    `;
export const Update_OwnerDocument = `
    mutation Update_Owner($input: OwnerInputDTO) {
  updateOwner(input: $input) {
    id
  }
}
    `;
export const GetPetListWithFilterDocument = `
    query GetPetListWithFilter($identificationNumber: String) {
  petByIdentificationNumberList(identificationNumber: $identificationNumber) {
    __typename
    id
    identificationNumber
    birthDate
    type {
      id
      name
    }
    owner {
      id
      firstName
      lastName
    }
    description {
      identifier
      description
    }
    tags {
      id
      name
    }
    diseases {
      petDiseaseIdentifier
      name
      description
    }
  }
}
    `;
export const DeletePetDocument = `
    mutation DeletePet($id: ID!) {
  deletePet(id: $id)
}
    `;
export const GetPetDocument = `
    query GetPet($id: ID) {
  pet(id: $id) {
    id
    identificationNumber
    birthDate
    type {
      id
      name
    }
    owner {
      id
      firstName
      lastName
    }
    description {
      identifier
      description
    }
    tags {
      id
      name
    }
    diseases {
      petDiseaseIdentifier
      name
      description
    }
  }
}
    `;
export const UpdatePetDocument = `
    mutation UpdatePet($input: PetInputDTO) {
  updatePet(input: $input) {
    id
  }
}
    `;
export const Get_Scalars_ListDocument = `
    query Get_Scalars_List {
  scalarsTestEntityList {
    id
    intTest
    intPrimitive
    byteTest
    bytePrimitive
    shortTest
    shortPrimitive
    doubleTest
    doublePrimitive
    floatTest
    floatPrimitive
    string
    bool
    boolPrimitive
    bigInt
    longTest
    longPrimitive
    bigDecimal
    localDate
    localDateTime
    localTime
    offsetDateTime
    offsetTime
    dateTest
    url
  }
}
    `;
export const Delete_ScalarsDocument = `
    mutation Delete_Scalars($id: ID!) {
  deleteScalarsTestEntity(id: $id)
}
    `;
export const Get_ScalarsDocument = `
    query Get_Scalars($id: ID) {
  scalarsTestEntity(id: $id) {
    id
    intTest
    intPrimitive
    byteTest
    bytePrimitive
    shortTest
    shortPrimitive
    doubleTest
    doublePrimitive
    floatTest
    floatPrimitive
    string
    bool
    boolPrimitive
    bigInt
    longTest
    longPrimitive
    bigDecimal
    localDate
    localDateTime
    localTime
    offsetDateTime
    offsetTime
    dateTest
    url
  }
}
    `;
export const Update_ScalarsDocument = `
    mutation Update_Scalars($input: ScalarsTestEntityInput) {
  updateScalarsTestEntity(input: $input) {
    id
  }
}
    `;
export const Document = `
    {
  userInfo {
    username
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UserInfo: build.query<UserInfoQuery, UserInfoQueryVariables | void>({
      query: (variables) => ({ document: UserInfoDocument, variables }),
    }),
    GetOwnerList: build.query<
      GetOwnerListQuery,
      GetOwnerListQueryVariables | void
    >({
      query: (variables) => ({ document: GetOwnerListDocument, variables }),
    }),
    DeleteOwner: build.mutation<
      DeleteOwnerMutation,
      DeleteOwnerMutationVariables
    >({
      query: (variables) => ({ document: DeleteOwnerDocument, variables }),
    }),
    Get_Owner: build.query<Get_OwnerQuery, Get_OwnerQueryVariables | void>({
      query: (variables) => ({ document: Get_OwnerDocument, variables }),
    }),
    Update_Owner: build.mutation<
      Update_OwnerMutation,
      Update_OwnerMutationVariables | void
    >({
      query: (variables) => ({ document: Update_OwnerDocument, variables }),
    }),
    GetPetListWithFilter: build.query<
      GetPetListWithFilterQuery,
      GetPetListWithFilterQueryVariables | void
    >({
      query: (variables) => ({
        document: GetPetListWithFilterDocument,
        variables,
      }),
    }),
    DeletePet: build.mutation<DeletePetMutation, DeletePetMutationVariables>({
      query: (variables) => ({ document: DeletePetDocument, variables }),
    }),
    GetPet: build.query<GetPetQuery, GetPetQueryVariables | void>({
      query: (variables) => ({ document: GetPetDocument, variables }),
    }),
    UpdatePet: build.mutation<
      UpdatePetMutation,
      UpdatePetMutationVariables | void
    >({
      query: (variables) => ({ document: UpdatePetDocument, variables }),
    }),
    Get_Scalars_List: build.query<
      Get_Scalars_ListQuery,
      Get_Scalars_ListQueryVariables | void
    >({
      query: (variables) => ({ document: Get_Scalars_ListDocument, variables }),
    }),
    Delete_Scalars: build.mutation<
      Delete_ScalarsMutation,
      Delete_ScalarsMutationVariables
    >({
      query: (variables) => ({ document: Delete_ScalarsDocument, variables }),
    }),
    Get_Scalars: build.query<
      Get_ScalarsQuery,
      Get_ScalarsQueryVariables | void
    >({
      query: (variables) => ({ document: Get_ScalarsDocument, variables }),
    }),
    Update_Scalars: build.mutation<
      Update_ScalarsMutation,
      Update_ScalarsMutationVariables | void
    >({
      query: (variables) => ({ document: Update_ScalarsDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const {
  useUserInfoQuery,
  useLazyUserInfoQuery,
  useGetOwnerListQuery,
  useLazyGetOwnerListQuery,
  useDeleteOwnerMutation,
  useGetOwnerQuery,
  useLazyGetOwnerQuery,
  useUpdateOwnerMutation,
  useGetPetListWithFilterQuery,
  useLazyGetPetListWithFilterQuery,
  useDeletePetMutation,
  useGetPetQuery,
  useLazyGetPetQuery,
  useUpdatePetMutation,
  useGetScalarsListQuery,
  useLazyGetScalarsListQuery,
  useDeleteScalarsMutation,
  useGetScalarsQuery,
  useLazyGetScalarsQuery,
  useUpdateScalarsMutation,
} = injectedRtkApi;
