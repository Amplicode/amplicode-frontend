import {GraphQLSchema} from "graphql";
import {getMockSchema} from "../../../../../test/test-commons";
import {getGraphQLStringTypeByPath} from "./getGraphQLStringTypeByPath";
import {expect} from "chai";

describe('getGraphQLStringTypeByPath', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('with mutation startField', () => {
    const updatePetField = schema.getMutationType()?.getFields()['update_Pet'];
    if (updatePetField == null) throw new Error();

    const petType = getGraphQLStringTypeByPath(schema, updatePetField, []);
    expect(petType).to.eq('PetDTO');

    const identificationNumberType = getGraphQLStringTypeByPath(schema, updatePetField, ['identificationNumber']);
    expect(identificationNumberType).to.eq('String');
  });

  it('with query startField', () => {
    const petField = schema.getQueryType()?.getFields()['pet'];
    if (petField == null) throw new Error();

    const petType = getGraphQLStringTypeByPath(schema, petField, []);
    expect(petType).to.eq('PetDTO');

    const identificationNumberType = getGraphQLStringTypeByPath(schema, petField, ['identificationNumber']);
    expect(identificationNumberType).to.eq('String');
  });

  it('in root of query', () => {
    const petField = schema.getQueryType()?.getFields()['pet'];
    if (petField == null) throw new Error();
    
    const petType = getGraphQLStringTypeByPath(schema, petField, []);
    expect(petType).to.eq('PetDTO');

    const petListField = schema.getQueryType()?.getFields()['petList'];
    if (petListField == null) throw new Error();

    const petListType = getGraphQLStringTypeByPath(schema, petListField, []);
    expect(petListType).to.eq('[PetDTO]');
  });

  it('with primitive', () => {
    const testQueryField = schema.getQueryType()?.getFields()['testList'];
    if (testQueryField == null) throw new Error();

    const floatType = getGraphQLStringTypeByPath(schema, testQueryField, ['floatTest']);
    expect(floatType).to.eq('Float');

    const intType = getGraphQLStringTypeByPath(schema, testQueryField, ['intTest']);
    expect(intType).to.eq('Int');

    const booleanType = getGraphQLStringTypeByPath(schema, testQueryField, ['bool']);
    expect(booleanType).to.eq('Boolean');

    const stringType = getGraphQLStringTypeByPath(schema, testQueryField, ['string']);
    expect(stringType).to.eq('String');
  });

  it('with date', () => {
    const testQueryField = schema.getQueryType()?.getFields()['testList'];
    if (testQueryField == null) throw new Error();

    const localDateType = getGraphQLStringTypeByPath(schema, testQueryField, ['localDate']);
    expect(localDateType).to.eq('Date');

    const localDateTimeType = getGraphQLStringTypeByPath(schema, testQueryField, ['localDateTime']);
    expect(localDateTimeType).to.eq('DateTime');

    const localTimeType = getGraphQLStringTypeByPath(schema, testQueryField, ['localTime']);
    expect(localTimeType).to.eq('Time');
  });

  it('with not null', () => {
    const testQueryField = schema.getQueryType()?.getFields()['testList'];
    if (testQueryField == null) throw new Error();

    const strictBooleanType = getGraphQLStringTypeByPath(schema, testQueryField, ['boolPrimitive']);
    expect(strictBooleanType).to.eq('Boolean!');

    const strictIntType = getGraphQLStringTypeByPath(schema, testQueryField, ['bytePrimitive']);
    expect(strictIntType).to.eq('Int!');
  });

  it('with array', () => {
    const petListField = schema.getQueryType()?.getFields()['petList'];
    if (petListField == null) throw new Error();

    const petListType = getGraphQLStringTypeByPath(schema, petListField, []);
    expect(petListType).to.eq('[PetDTO]');
  });

  it('get type by deep path', () => {
    const petField = schema.getQueryType()?.getFields()['pet'];
    if (petField == null) throw new Error();
    
    const ownerType = getGraphQLStringTypeByPath(schema, petField, ['owner']);
    expect(ownerType).to.eq('OwnerDTO');
    const ownerCityType = getGraphQLStringTypeByPath(schema, petField, ['owner', 'city']);
    expect(ownerCityType).to.eq('String');
    const ownerEmailType = getGraphQLStringTypeByPath(schema, petField, ['owner', 'email']);
    expect(ownerEmailType).to.eq('String');

    const petTypeType = getGraphQLStringTypeByPath(schema, petField, ['type']);
    expect(petTypeType).to.eq('PetTypeDTO');
    const petTypeNameType = getGraphQLStringTypeByPath(schema, petField, ['type', 'name']);
    expect(petTypeNameType).to.eq('String');
  });
});
