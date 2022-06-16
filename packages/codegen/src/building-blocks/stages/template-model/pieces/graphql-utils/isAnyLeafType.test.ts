import {isAnyLeafType} from "./isAnyLeafType";
import {expect} from "chai";
import {GraphQLObjectType, GraphQLScalarType} from "graphql/type/definition";
import {GraphQLEnumType, GraphQLList} from "graphql";

describe('isAnyLeafType()', () => {
  it('determines leaf types correctly', () => {
    expect(isAnyLeafType(new GraphQLScalarType({name: 'test'}))).to.eq(true);
    expect(isAnyLeafType(new GraphQLList(new GraphQLScalarType({name: 'test'})))).to.eq(true);
    expect(isAnyLeafType(new GraphQLEnumType({name: 'test', values: {}}))).to.eq(true);
    expect(isAnyLeafType(new GraphQLObjectType({name: 'test', fields: {}}))).to.eq(false);
    expect(isAnyLeafType(new GraphQLList(new GraphQLObjectType({name: 'test', fields: {}})))).to.eq(false);
  });
});
