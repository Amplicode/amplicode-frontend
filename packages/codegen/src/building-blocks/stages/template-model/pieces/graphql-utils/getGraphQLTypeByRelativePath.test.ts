import {GraphQLSchema} from "graphql";
import {getMockSchema} from "../../../../../test/test-commons";
import {getGraphQLTypeByRelativePath} from "./getGraphQLTypeByRelativePath";
import {expect} from "chai";

describe('getGraphQLTypeByRelativePath', async () => {
  let schema: GraphQLSchema;

  before(async () => {
    schema = await getMockSchema();
  });

  it('with mutation startField', () => {
    const mutationType = schema.getMutationType();
    if(mutationType == null) throw new Error();

    const petType = getGraphQLTypeByRelativePath(schema, mutationType, ['updatePet']);
    expect(petType.toString()).to.eq('PetDTO');

    const identificationNumberType = getGraphQLTypeByRelativePath(schema, mutationType, ['updatePet', 'identificationNumber']);
    expect(identificationNumberType.toString()).to.eq('String');
  });

  it('with query startField', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
  
    const petType = getGraphQLTypeByRelativePath(schema, queryType, ['pet']);
    expect(petType.toString()).to.eq('PetDTO');

    const identificationNumberType = getGraphQLTypeByRelativePath(schema, queryType, ['pet', 'identificationNumber']);
    expect(identificationNumberType.toString()).to.eq('String');
  });

  it('in root of query', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    
    const queryStringType = getGraphQLTypeByRelativePath(schema, queryType, []);
    expect(queryStringType.toString()).to.eq('Query');

    const petType = getGraphQLTypeByRelativePath(schema, queryType, ['pet']);
    const petStringType = getGraphQLTypeByRelativePath(schema, petType, []);
    expect(petStringType.toString()).to.eq('PetDTO');

    const petListType = getGraphQLTypeByRelativePath(schema, queryType, ['petList']);
    const petListStringType = getGraphQLTypeByRelativePath(schema, petListType, []);
    expect(petListStringType.toString()).to.eq('[PetDTO]');
  });

  // TODO enable when TestDTO will be added to the graphql schema
  xit('with primitive', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    const testType = getGraphQLTypeByRelativePath(schema, queryType, ['testList']);

    const floatType = getGraphQLTypeByRelativePath(schema, testType, ['floatTest']);
    expect(floatType).to.eq('Float');

    const intType = getGraphQLTypeByRelativePath(schema, testType, ['intTest']);
    expect(intType).to.eq('Int');

    const booleanType = getGraphQLTypeByRelativePath(schema, testType, ['bool']);
    expect(booleanType).to.eq('Boolean');

    const stringType = getGraphQLTypeByRelativePath(schema, testType, ['string']);
    expect(stringType).to.eq('String');
  });

  // TODO enable when TestDTO will be added to the graphql schema
  xit('with date', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    const testType = getGraphQLTypeByRelativePath(schema, queryType, ['testList']);

    const localDateType = getGraphQLTypeByRelativePath(schema, testType, ['localDate']);
    expect(localDateType).to.eq('Date');

    const localDateTimeType = getGraphQLTypeByRelativePath(schema, testType, ['localDateTime']);
    expect(localDateTimeType).to.eq('DateTime');

    const localTimeType = getGraphQLTypeByRelativePath(schema, testType, ['localTime']);
    expect(localTimeType).to.eq('Time');
  });

  // TODO enable when TestDTO will be added to the graphql schema
  xit('with not null', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    const testType = getGraphQLTypeByRelativePath(schema, queryType, ['testList']);

    const strictBooleanType = getGraphQLTypeByRelativePath(schema, testType, ['boolPrimitive']);
    expect(strictBooleanType).to.eq('Boolean!');

    const strictIntType = getGraphQLTypeByRelativePath(schema, testType, ['bytePrimitive']);
    expect(strictIntType).to.eq('Int!');
  });

  it('with array', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();

    const petListType = getGraphQLTypeByRelativePath(schema, queryType, ['petList']);
    expect(petListType.toString()).to.eq('[PetDTO]');
  });

  it('get type by deep path', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    
    const ownerType = getGraphQLTypeByRelativePath(schema, queryType, ['pet', 'owner']);
    expect(ownerType.toString()).to.eq('OwnerDTO');
    const ownerCityType = getGraphQLTypeByRelativePath(schema, queryType, ['pet', 'owner', 'city']);
    expect(ownerCityType.toString()).to.eq('String');
    const ownerEmailType = getGraphQLTypeByRelativePath(schema, queryType, ['pet', 'owner', 'email']);
    expect(ownerEmailType.toString()).to.eq('String');

    const petTypeType = getGraphQLTypeByRelativePath(schema, queryType, ['pet', 'type']);
    expect(petTypeType.toString()).to.eq('PetTypeDTO');
    const petTypeNameType = getGraphQLTypeByRelativePath(schema, queryType, ['pet', 'type', 'name']);
    expect(petTypeNameType.toString()).to.eq('String');
  });

  it('in argument', () => {
    const queryType = schema.getQueryType();
    if(queryType == null) throw new Error();
    
    const filterArgType = queryType.getFields()['ownerByNamesList'].args.find(({name}) => name === 'filter')?.type;
    if (filterArgType == null) throw new Error();
    expect(filterArgType.toString()).to.eq('OwnerFilterInput');
    
    const firstNameType = getGraphQLTypeByRelativePath(schema, filterArgType, ['firstName'])
    expect(firstNameType.toString()).to.eq('String');
    const lastNameType = getGraphQLTypeByRelativePath(schema, filterArgType, ['lastName'])
    expect(lastNameType.toString()).to.eq('String');
  });
});
