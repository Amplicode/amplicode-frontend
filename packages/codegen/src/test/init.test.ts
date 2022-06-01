import {collectClients} from "../init";
import {expect} from "chai";

describe('init', function () {

  it('should collect clients', function () {
    const clients = collectClients('index.ts')
      .sort((a, b) => a.name.localeCompare(b.name));
    expect(clients.length).to.eq(1);

    const genCountOfClient: Map<string, number> = new Map();
    genCountOfClient.set('react-typescript', 7);

    genCountOfClient.forEach((num, client) =>
        expect(clients.find(c => c.name == client)!.generators.length).eq(num));
  });
});
