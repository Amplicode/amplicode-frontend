import {GraphQLSchema} from "graphql";
import {getMockSchema} from "../../../test/test-commons";
import {deriveGraphQLEditorModel} from "./template-model";
import gql from "graphql-tag";
import {expect} from "chai";

describe('entity-details template-model stage', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('deriveGraphQLEditorModel finds entityName for type', () => {
    const templateModel = deriveGraphQLEditorModel(QUERY_NODE, 'id', schema);
    expect(templateModel.attributes.find(a => a.name === 'type')?.type).to.eq('PetTypeDTO');
  });
});

const QUERY_NODE = gql(`
  query Get_Pet($id: BigInteger) {
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
    }
  }
`);
