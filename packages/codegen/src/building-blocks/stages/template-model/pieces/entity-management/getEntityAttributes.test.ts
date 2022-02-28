import gql from "graphql-tag";
import {expect} from "chai";
import {getEntityAttributes} from "./getEntityAttributes";

describe('entity list template model stage', () => {
  it('derives a list of entity attributes', () => {
    const attributes = getEntityAttributes(QUERY_NODE, 'id');
    expect(attributes.sort()).to.deep.equal(RESULT.sort());
  });

  it('relation field is marked as such', () => {
    const attributes = getEntityAttributes(QUERY_NODE, 'id');
    const ownerAttr = attributes.find(attr => attr.name === 'owner');
    expect(ownerAttr?.isRelationField).to.eq(true);
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
        }
    }
`);

const RESULT = [
  {
    "displayName": "Identification Number",
    "isRelationField": false,
    "name": "identificationNumber",
  },
  {
    "displayName": "Owner",
    "isRelationField": true,
    "name": "owner",
  }
];