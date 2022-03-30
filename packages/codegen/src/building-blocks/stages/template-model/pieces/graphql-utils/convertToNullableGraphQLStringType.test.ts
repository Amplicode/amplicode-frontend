import {convertToNullableGraphQLStringType} from "./convertToNullableGraphQLStringType";
import {expect} from "chai";

describe('convertToNullableGraphQLStringType', () => {
  it('with not null types', () => {
    const notNullType = convertToNullableGraphQLStringType('Type!');
    expect(notNullType).to.eq('Type');

    const notNullArrayType = convertToNullableGraphQLStringType('[Type]!');
    expect(notNullArrayType).to.eq('[Type]');
  });

  it('with nullable types', () => {
    const nullableType = convertToNullableGraphQLStringType('Type');
    expect(nullableType).to.eq('Type');

    const nullableArrayType = convertToNullableGraphQLStringType('[Type]');
    expect(nullableArrayType).to.eq('[Type]');
  });

  it('with deep not null type', () => {
    const nullableArrayType = convertToNullableGraphQLStringType('[[Type]]');
    expect(nullableArrayType).to.eq('[[Type]]');

    const arrayWithNotNullTypeOne = convertToNullableGraphQLStringType('[Type!]');
    expect(arrayWithNotNullTypeOne).to.eq('[Type]');

    const arrayWithNotNullTypeTwo = convertToNullableGraphQLStringType('[Type!]!');
    expect(arrayWithNotNullTypeTwo).to.eq('[Type]');

    const arrayWithNotNullTypeThree = convertToNullableGraphQLStringType('[[[Type!]]!]');
    expect(arrayWithNotNullTypeThree).to.eq('[[[Type]]]');

    const arrayWithNotNullTypeFour = convertToNullableGraphQLStringType('[[[Type!]!]!]!');
    expect(arrayWithNotNullTypeFour).to.eq('[[[Type]]]');
  })
});
