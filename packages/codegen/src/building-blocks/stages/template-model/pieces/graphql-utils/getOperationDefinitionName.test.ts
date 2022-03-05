import {getOperationDefinitionName} from "./getOperationDefinitionName";
import gql from "graphql-tag";
import {expect} from "chai";

describe('getOperationDefinitionName', () => {
  it('gets operation definition name', function () {
    const name = getOperationDefinitionName(gql(`
      query Get_Owner_List {
        ownerList {id}
      }`));
    expect(name).eq('Get_Owner_List');
  });
});