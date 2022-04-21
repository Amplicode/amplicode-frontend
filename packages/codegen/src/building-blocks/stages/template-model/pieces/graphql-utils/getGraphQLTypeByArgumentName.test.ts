import {GraphQLSchema} from "graphql";
import {getMockSchema} from "../../../../../test/test-commons";
import {getGraphQLTypeByArgumentName} from "./getGraphQLTypeByArgumentName";
import {expect} from "chai";

describe('getGraphQLTypeByArgumentName', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('not deep', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    
    const typeWithArgs = queryType.getFields()['petByIdentificationNumberList'];
    if (typeWithArgs == null) throw new Error();

    const firstNameType = getGraphQLTypeByArgumentName(schema, typeWithArgs, ['identificationNumber'])
    expect(firstNameType.toString()).to.eq('String');
  });

  it('deep', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    
    const filterArgType = queryType.getFields()['ownerByNamesList'];
    if (filterArgType == null) throw new Error();

    const agrType = getGraphQLTypeByArgumentName(schema, filterArgType, ['filter']);
    expect(agrType.toString()).to.eq('OwnerFilterInput');
    const firstNameType = getGraphQLTypeByArgumentName(schema, filterArgType, ['filter', 'firstName']);
    expect(firstNameType.toString()).to.eq('String');
    const lastNameType = getGraphQLTypeByArgumentName(schema, filterArgType, ['filter', 'lastName']);
    expect(lastNameType.toString()).to.eq('String');
  });
});
