import gql from "graphql-tag";
import {expect} from "chai";
import {getEntityAttributes} from "./getEntityAttributes";
import {getMockSchema} from "../../../../../test/test-commons";
import {GraphQLSchema} from "graphql";

describe('getEntityAttributes', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('derives a list of entity attributes', () => {
    const attributes = getEntityAttributes(QUERY_NODE, schema, 'id');
    expect(attributes.map(({gqlType: _gqlType, ...attr}) => ({...attr})).sort()).to.deep.equal(RESULT.sort());
  });

  it('relation field is marked as such', () => {
    const attributes = getEntityAttributes(QUERY_NODE, schema, 'id');
    const ownerAttr = attributes.find(attr => attr.name === 'owner');
    expect(ownerAttr?.isSingleRelationField).to.eq(true);
  });

  it('relation field has entity name', () => {
    const attributes = getEntityAttributes(QUERY_NODE, schema, 'id');
    const ownerAttr = attributes.find(attr => attr.name === 'owner');
    expect(ownerAttr?.type).to.eq('OwnerDTO');
  });

  it('query contains id attribute with custom name', () => {
    const attributes = getEntityAttributes(QUERY_WITHOUT_ID, schema, 'identificationNumber');
    const dateAttr = attributes.find(attr => attr.name === 'birthDate');
    expect(dateAttr?.type).to.eq('Date');
  });

  it('fails if there is no "id" attribute in query', () => {
    expect(() => getEntityAttributes(QUERY_WITHOUT_ID, schema, 'id'))
      .to.throw("pet query attributes did not contain id attribute with name 'id', " +
      "which required for screen generation");
  });

});

const QUERY_WITHOUT_ID = gql(`
  query Get_Pet($id: BigInteger) {
    pet(id: $id) {
      identificationNumber
      birthDate
    }
  }
`);

const QUERY_NODE = gql(`
    query Get_Pet_List {
      petList {
        id
        identificationNumber
        owner {
          firstName
          lastName
        }
        type {
          id
        }
        tags {
          id
        }
      }
    }
`);

const RESULT = [
  {
    nestedAttributes: undefined,
    displayName: "Identification Number",
    isSingleRelationField: false,
    isMultiRelationField: false,
    name: "identificationNumber",
    type: "String",
    enumOptions: undefined
  },
  {
    nestedAttributes: [
      "address",
      "city",
      "email",
      "firstName",
      "id",
      "lastName",
      "telephone",
    ],
    displayName: "Owner",
    isSingleRelationField: true,
    isMultiRelationField: false,
    name: "owner",
    type: "OwnerDTO",
    enumOptions: undefined
  },
  {
    nestedAttributes: [
      "defenseStatus",
      "id",
      "name"
    ],
    displayName: "Type",
    isSingleRelationField: true,
    isMultiRelationField: false,
    name: "type",
    type: "PetTypeDTO",
    enumOptions: undefined
  },
  {
    displayName: "Tags",
    isMultiRelationField: true,
    isSingleRelationField: false,
    name: "tags",
    nestedAttributes: [
      "id",
      "name",
    ],
    type: "TagDTO",
    enumOptions: undefined
  },

];
