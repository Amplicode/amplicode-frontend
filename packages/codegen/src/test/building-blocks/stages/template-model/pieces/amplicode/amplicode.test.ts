import {
  getOperationName,
  getQueryName
} from "../../../../../../building-blocks/stages/template-model/pieces/amplicode/amplicode";
import gql from "graphql-tag";
import {expect} from "chai";

describe('building-blocks/stages/template-model/pieces/amplicode', function () {

  it('getOperationName', function () {
    const name = getOperationName(gql(`
    query Get_Owner_List {
      ownerList {id}
    }`));
    expect(name).eq('ownerList');
  });

  it('getQueryName', function () {
    const name = getQueryName(gql(`
    query Get_Owner_List {
      ownerList {id}
    }`));
    expect(name).eq('Get_Owner_List');
  });

});
