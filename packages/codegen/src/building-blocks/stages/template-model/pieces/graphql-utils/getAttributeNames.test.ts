import {GraphQLSchema} from "graphql";
import {getMockSchema} from "../../../../../test/test-commons";
import {getAttributeNames} from "./getAttributeNames";
import {expect} from "chai";

describe('getAttributeNames', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('determines all attributes based on schema', () => {
    const attrs = getAttributeNames('PetDTO', schema);
    expect(attrs.sort()).to.deep.equal([
      'id', 'identificationNumber', 'owner', 'birthDate', 'description', 'diseases', 'tags', 'type'
    ].sort());
  });
});