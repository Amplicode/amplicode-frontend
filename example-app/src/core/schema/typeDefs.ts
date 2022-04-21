export const typeDefs = /* GraphQL */ `
  # Mutation root
  type Mutation {
    deleteOwner(id: ID!): Void
    deletePet(id: ID!): Void
    deletePetType(id: ID!): Void
    deleteVisit(id: ID): Void
    updateOwner(input: OwnerInputDTOInput): OwnerDTO
    updatePet(input: PetInputDTOInput): PetDTO
    updatePetType(input: PetTypeInputDTOInput): PetTypeDTO
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
    type: PetTypeDTO
  }

  type PetTypeDTO {
    id: ID
    name: String
  }

  # Query root
  type Query {
    owner(id: ID): OwnerDTO
    ownerList: [OwnerDTO]
    ownerByNamesList(filter: OwnerFilterInput): [OwnerDTO]
    petByIdentificationNumberList(identificationNumber: String): [PetDTO]
    pet(id: ID): PetDTO
    petList: [PetDTO]
    petType(id: ID): PetTypeDTO
    petTypeList: [PetTypeDTO]
    userInfo: UserInfo
    visit(id: ID): VisitDTO
    visitList: [VisitDTO]
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

  input OwnerFilterInput {
    firstName: String
    lastName: String
  }

  input OwnerDTOInput {
    address: String
    city: String
    email: String
    firstName: String
    id: ID
    lastName: String
    telephone: String
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
    type: PetTypeDTOInput
  }

  input PetInputDTOInput {
    birthDate: Date
    id: ID
    identificationNumber: String
    owner: OwnerDTOInput
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

  input VisitInputDTOInput {
    description: String
    id: ID
    pet: PetDTOInput
    visitEnd: LocalDateTime
    visitStart: LocalDateTime
  }
`;
