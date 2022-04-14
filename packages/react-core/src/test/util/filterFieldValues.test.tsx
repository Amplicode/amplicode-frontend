import {filterFieldValues} from "../../util/filterFieldValues";
import { expect } from 'chai'

const fieldValues = {
  "birthDate": "2022-06-01",
  "identificationNumber": "1232",
  "__typename": "PetDTO",
  "owner": {
    "id": 6,
    "firstName": "Fernando",
    "lastName": "Mitchell",
    "__typename": "OwnerDTO"
  },
  "type": {
    "id": 1,
    "name": "DOG",
    "__typename": "PetTypeDTO"
  }
};

const fieldValuesWithArray = {
  "birthDate": "2022-06-01",
  "identificationNumber": "1232",
  "__typename": "PetDTO",
  "owner": [
    {
      "id": 6,
      "firstName": "Fernando",
      "lastName": "Mitchell",
      "__typename": "OwnerDTO"
    },
    {
      "id": 7,
      "firstName": "John",
      "lastName": "Doe",
      "__typename": "OwnerDTO"
    },
  ],
  "type": {
    "id": 1,
    "name": "DOG",
    "__typename": "PetTypeDTO"
  }
};

describe('filterFieldValues()', () => {
  it('works with empty sortOutFields', () => {
    let result = filterFieldValues(fieldValues, []);
    expect(result).deep.equal(fieldValues);

    result = filterFieldValues(fieldValuesWithArray, []);
    expect(result).deep.equal(fieldValuesWithArray);
  });

  it('filter all __typename fields recursively from object', () => {
    const result = filterFieldValues(fieldValues, ['__typename']);
    expect(result).not.have.property('__typename');
    expect(result.birthDate).eq("2022-06-01");
    expect(result.identificationNumber).eq("1232");

    expect(result.type).not.have.property('__typename');
    expect(result.type).have.property('id');
    expect(result.type).have.property('name');

    expect(result.owner).not.have.property('__typename');
    expect(result.owner).have.property('id');
    expect(result.owner).have.property('firstName');
    expect(result.owner).have.property('lastName');
  });

  it('filter more than one field recursively from object', () => {
    const result = filterFieldValues(fieldValues, ['__typename', 'id']);
    expect(result).not.have.property('__typename');
    expect(result.birthDate).eq("2022-06-01");
    expect(result.identificationNumber).eq("1232");

    expect(result.type).not.have.property('__typename');
    expect(result.type).not.have.property('id');
    expect(result.type).have.property('name');

    expect(result.owner).not.have.property('__typename');
    expect(result.owner).not.have.property('id');
    expect(result.owner).have.property('firstName');
    expect(result.owner).have.property('lastName');
  });

  it('filter more than one field recursively from object that contain array', () => {
    const result = filterFieldValues(fieldValuesWithArray, ['__typename', 'id']);
    expect(result).not.have.property('__typename');
    expect(result).not.have.property('id');
    expect(result.birthDate).eq("2022-06-01");
    expect(result.identificationNumber).eq("1232");

    const owner0 = (result.owner as Array<unknown>)[0];
    const owner1 = (result.owner as Array<unknown>)[1];

    expect(owner0).not.have.property('id');
    expect(owner0).not.have.property('__typename');
    expect(owner0).have.property('firstName');
    expect(owner0).have.property('lastName');

    expect(owner1).not.have.property('id');
    expect(owner1).not.have.property('__typename');
    expect(owner1).have.property('firstName');
    expect(owner1).have.property('lastName');

    expect(result.type).not.have.property('id');
    expect(result.type).not.have.property('__typename');
    expect(result.type).have.property('name');
  });
});
