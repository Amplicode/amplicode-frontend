import gql from "graphql-tag";
import {expect} from "chai";
import {getEntityAttributes} from "./getEntityAttributes";
import {getMockSchema} from "../../../../../test/test-commons";
import {GraphQLSchema} from "graphql";

describe('entity list template model stage', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('derives a list of entity attributes', () => {
    const attributes = getEntityAttributes(QUERY_NODE, schema);
    expect(attributes.sort()).to.deep.equal(RESULT.sort());
  });

  it('relation field is marked as such', () => {
    const attributes = getEntityAttributes(QUERY_NODE, schema);
    const ownerAttr = attributes.find(attr => attr.name === 'owner');
    expect(ownerAttr?.isRelationField).to.eq(true);
  });

  it('relation field has entity name', () => {
    const attributes = getEntityAttributes(QUERY_NODE, schema);
    const ownerAttr = attributes.find(attr => attr.name === 'owner');
    expect(ownerAttr?.type).to.eq('OwnerDTO');
  });
});

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