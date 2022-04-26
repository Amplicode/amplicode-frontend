export const typeDefs = /* GraphQL */ `
  # Mutation root
  type Mutation {
    deleteOwner(id: ID!): Void
    deletePet(id: ID!): Void
    deletePetType(id: ID!): Void
    deleteScalarsTestEntity(id: ID): Void
    deleteTag(id: ID): Void
    deleteVisit(id: ID): Void
    updateOwner(input: OwnerInputDTOInput): OwnerDTO
    updatePet(input: PetInputDTOInput): PetDTO
    updatePetType(input: PetTypeInputDTOInput): PetTypeDTO
    updateScalarsTestEntity(input: ScalarsTestEntityInput): ScalarsTestEntity
    updateTag(input: TagInputDTOInput): TagDTO
    updateVisit(input: VisitInputDTOInput): VisitDTO
  }

  type OwnerDTO {
    address: String
    city: String
    email: String
    firstName: String
    id: ID
    lastName: String
    telephone: String
  }

  type PetDTO {
    birthDate: Date
    id: ID
    identificationNumber: String
    owner: OwnerDTO
    tags: [TagDTO]
    type: PetTypeDTO
  }

  type PetTypeDTO {
    id: ID
    name: String
  }

  # Query root
  type Query {
    owner(id: ID): OwnerDTO
    ownerByNamesList(filter: OwnerFilterInput): [OwnerDTO]
    ownerByNamesSeparateMethodsList(filter: OwnerFilterInput): [OwnerDTO]
    ownerList: [OwnerDTO]
    pet(id: ID): PetDTO
    petByIdentificationNumberList(identificationNumber: String): [PetDTO]
    petList: [PetDTO]
    petType(id: ID): PetTypeDTO
    petTypeList: [PetTypeDTO]
    scalarsTestEntity(id: ID): ScalarsTestEntity
    scalarsTestEntityList: [ScalarsTestEntity]
    tag(id: ID): TagDTO
    tagList: [TagDTO]
    userInfo: UserInfo
    visit(id: ID): VisitDTO
    visitList: [VisitDTO]
  }

  type ScalarsTestEntity {
    bigDecimal: BigDecimal
    bigInt: BigInteger
    bool: Boolean
    floatTest: Float
    id: ID
    intTest: Int
    longTest: Long
    string: String
  }

  type TagDTO {
    id: ID
    name: String
  }

  type UserInfo {
    username: String
  }

  type VisitDTO {
    description: String
    id: ID
    pet: PetDTO
    visitEnd: LocalDateTime
    visitStart: LocalDateTime
  }

  # Java Type: BigDecimal
  scalar BigDecimal

  # Java Type: BigInteger
  scalar BigInteger

  # Java Type: LocalDate
  scalar Date

  # Java Type: OffsetDateTime
  scalar DateTime

  # Java Type: LocalDateTime
  scalar LocalDateTime

  # Java Type: LocalTime
  scalar LocalTime

  # Java Type: Long, long
  scalar Long

  # Java Type: OffsetTime
  scalar Time

  # Java Type: Date
  scalar Timestamp

  # Java Type: URL
  scalar Url

  # Java Type: Void
  scalar Void

  input OwnerDTOInput {
    address: String
    city: String
    email: String
    firstName: String
    id: ID
    lastName: String
    telephone: String
  }

  input OwnerFilterInput {
    firstName: String
    lastName: String
  }

  input OwnerInputDTOInput {
    address: String
    city: String
    email: String
    firstName: String
    id: ID
    lastName: String
    telephone: String
  }

  input PetDTOInput {
    birthDate: Date
    id: ID
    identificationNumber: String
    owner: OwnerDTOInput
    tags: [TagDTOInput]
    type: PetTypeDTOInput
  }

  input PetInputDTOInput {
    birthDate: Date
    id: ID
    identificationNumber: String
    owner: OwnerDTOInput
    tags: [TagDTOInput]
    type: PetTypeDTOInput
  }

  input PetTypeDTOInput {
    id: ID
    name: String
  }

  input PetTypeInputDTOInput {
    id: ID
    name: String
  }

  input ScalarsTestEntityInput {
    bigDecimal: BigDecimal
    bigInt: BigInteger
    bool: Boolean
    floatTest: Float
    id: ID
    intTest: Int
    longTest: Long
    string: String
  }

  input TagDTOInput {
    id: ID
    name: String
  }

  input TagInputDTOInput {
    id: ID
    name: String
  }

  input VisitInputDTOInput {
    description: String
    id: ID
    pet: PetDTOInput
    visitEnd: LocalDateTime
    visitStart: LocalDateTime
  }
`;
