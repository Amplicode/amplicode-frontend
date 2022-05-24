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
    expect(attributes.sort()).to.deep.equal(RESULT.sort());
  });

  it('relation field is marked as such', () => {
    const attributes = getEntityAttributes(QUERY_NODE, schema, 'id');
    const ownerAttr = attributes.find(attr => attr.name === 'owner');
    expect(ownerAttr?.isRelationField).to.eq(true);
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
        }
    }
`);

const RESULT = [
  {
    allNestedAttributes: undefined,
    displayName: "Birth Date",
    isRelationField: false,
    name: "birthDate",
    type: "Date",
  },
  {
    allNestedAttributes: undefined,
    displayName: "Id",
    isRelationField: false,
    name: "id",
    type: "BigInteger",
  },
  {
    allNestedAttributes: undefined,
    displayName: "Identification Number",
    isRelationField: false,
    name: "identificationNumber",
    type: "String",
  },
  {
    allNestedAttributes: [
      "address",
      "city",
      "email",
      "firstName",
      "id",
      "lastName",
      "telephone",
    ],
    displayName: "Owner",
    isRelationField: true,
    name: "owner",
    type: "OwnerDTO",
  },
  {
    "allNestedAttributes": [
      "id",
      "name"
    ],
    displayName: "Type",
    isRelationField: true,
    name: "type",
    type: "PetTypeDTO",
  },
];
