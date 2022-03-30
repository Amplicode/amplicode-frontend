import { flatten, unflatten } from "./flatten";

const simpleArray = [1, 2, 3]
const flattenSimpleArray = {
  '[0]': 1,
  '[1]': 2,
  '[2]': 3,
}

const simpleObject = {
  a: 'a',
  b: 'b',
  c: 'c'
}
const flattenSimpleObject = {
  'a': 'a',
  'b': 'b',
  'c': 'c'
}

const twoLevelsOfDeepOne = {a: {b: 0}}
const flattenTwoLevelsOfDeepOne = {'a.b': 0}
const twoLevelsOfDeepTwo = {a: [0]}
const flattenTwoLevelsOfDeepTwo = {'a[0]': 0}
const twoLevelsOfDeepThree = [{a: 0}]
const flattenTwoLevelsOfDeepThree = {'[0].a': 0}
const twoLevelsOfDeepFour = [[0]]
const flattenTwoLevelsOfDeepFour = {'[0][0]': 0}

const manyLevelsOfDeepObject = {
  a: [{b: [{c: [0, 1]}]}],
  d: { e: 2, i: 3 },
  f: [[[[4, 5]]]],
  h: [
    {l: 6, j: 7},
    {n: 8, m: {
      t: 9,
      p: 10
    }}
  ]
}
const flattenManyLevelsOfDeepObjectObject = {
  "a[0].b[0].c[0]": 0,
  "a[0].b[0].c[1]": 1,
  "d.e": 2,
  "d.i": 3,
  "f[0][0][0][0]": 4,
  "f[0][0][0][1]": 5,
  "h[0].l": 6,
  "h[0].j": 7,
  "h[1].n": 8,
  "h[1].m.t": 9,
  "h[1].m.p": 10,
}

describe("flatten", () => {
  it('with primitives', () => {
    expect(flatten(0)).toEqual({'': 0})
    expect(flatten(true)).toEqual({'': true})
    expect(flatten('str')).toEqual({'': 'str'})
    expect(flatten(null)).toEqual({'': null})
    expect(flatten(undefined)).toEqual({'': undefined})
  })

  it('with object', () => {
    expect(flatten(simpleObject)).toEqual(flattenSimpleObject)
  })

  it("with array", () => {
    expect(flatten(simpleArray)).toEqual(flattenSimpleArray)
  });

  it('with 2 level of deep', () => {
    expect(flatten(twoLevelsOfDeepOne)).toEqual(flattenTwoLevelsOfDeepOne);
    expect(flatten(twoLevelsOfDeepTwo)).toEqual(flattenTwoLevelsOfDeepTwo);
    expect(flatten(twoLevelsOfDeepThree)).toEqual(flattenTwoLevelsOfDeepThree);
    expect(flatten(twoLevelsOfDeepFour)).toEqual(flattenTwoLevelsOfDeepFour);
  })

  it('with many levels of deep', () => {
    expect(flatten(manyLevelsOfDeepObject)).toEqual(flattenManyLevelsOfDeepObjectObject)
  })
})

describe("unflatten", () => {
  it('with primitives', () => {
    expect(unflatten({'': 0})).toEqual(0)
    expect(unflatten({'': true})).toEqual(true)
    expect(unflatten({'': 'str'})).toEqual('str')
    expect(unflatten({'': null})).toEqual(null)
    expect(unflatten({'': undefined})).toEqual(undefined)
  })

  it('with object', () => {
    expect(unflatten(flattenSimpleObject)).toEqual(simpleObject)
  })

  it("with array", () => {
    expect(unflatten(flattenSimpleArray)).toEqual(simpleArray)
  });

  it('with 2 level of deep', () => {
    expect(unflatten(flattenTwoLevelsOfDeepOne)).toEqual(twoLevelsOfDeepOne);
    expect(unflatten(flattenTwoLevelsOfDeepTwo)).toEqual(twoLevelsOfDeepTwo);
    expect(unflatten(flattenTwoLevelsOfDeepThree)).toEqual(twoLevelsOfDeepThree);
    expect(unflatten(flattenTwoLevelsOfDeepFour)).toEqual(twoLevelsOfDeepFour);
  })

  it('with many levels of deep', () => {
    expect(unflatten(flattenManyLevelsOfDeepObjectObject)).toEqual(manyLevelsOfDeepObject)
  })
})
