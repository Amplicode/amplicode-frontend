import {getTopFieldName} from "./getTopFieldName";
import gql from "graphql-tag";
import {expect} from "chai";

describe('getTopFieldName()', async () => {
  it('gets top field name', function () {
    const name = getTopFieldName(gql(`
    query Get_Owner_List {
      ownerList {id}
    }`));
    expect(name).eq('ownerList');
  });
});