import {isAnyLeafType} from "./isAnyLeafType";
import {expect} from "chai";
import {GraphQLObjectType, GraphQLScalarType} from "graphql/type/definition";
import {GraphQLEnumType} from "graphql";

describe('isAnyLeafType()', () => {
  it('determines leaf types correctly', () => {
    expect(isAnyLeafType(new GraphQLScalarType({name: 'test'}))).to.eq(true);
    expect(isAnyLeafType(new GraphQLEnumType({name: 'test', values: {}}))).to.eq(true);
    expect(isAnyLeafType(new GraphQLObjectType({name: 'test', fields: {}}))).to.eq(false);
  });
});