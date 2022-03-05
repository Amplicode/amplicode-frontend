import {GraphQLSchema} from "graphql";
import {getMockSchema} from "../../../../../test/test-commons";
import {getEntityName} from "./getEntityName";
import {expect} from "chai";

describe('getEntityName', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('determines entity name', () => {
    const entityName = getEntityName('petList', schema);
    expect(entityName).to.eq('PetDTO');
  });
});
