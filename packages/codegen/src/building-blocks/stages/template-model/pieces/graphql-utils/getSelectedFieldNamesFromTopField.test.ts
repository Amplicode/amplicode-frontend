import {getSelectedFieldNamesFromTopField} from "./getSelectedFieldNamesFromTopField";
import {expect} from "chai";
import gql from "graphql-tag";

describe('getSelectedFieldNamesFromTopField', async () => {
  it('select field names from top field', () => {
    const selectedFieldNames = getSelectedFieldNamesFromTopField(gql(`query {
      topField {
        one
        two
        three {
          five
        }
        four
      }
    }`));
    expect(selectedFieldNames).to.deep.eq([
      'one',
      'two',
      'three',
      'four',
    ]);
  });
});
