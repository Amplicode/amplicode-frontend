import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {ownerDeleteMutation, ownerListQuery, petDeleteMutation, petListQuery} from "../common/queries";

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', 'entity-list');
const displayNameFunctionFile = path.join(DEST_DIR, 'core', 'display-name', 'getOwnerDTODisplayName.ts');

describe('codegen standalone cards', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate standalone cards screen - Owner', async () => {

    const answers = {
      componentName: 'StandaloneOwnerCards',
      route: 'standalone-owner-cards',
      shouldAddToMenu: false,
      query: ownerListQuery,
      mutation: ownerDeleteMutation,
      mode: 'edit',
      type: 'cards'
    };
    const componentPath = path.join(DEST_DIR, 'StandaloneOwnerCards.tsx');
    // check that cleanup is completed, before test start
    expect(fs.existsSync(displayNameFunctionFile)).to.be.false;

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-list'), opts(DEST_DIR, answers, SCHEMA_PATH));

    const expectCardsTag = `
        <Space direction="vertical" className="card-space">
          {items.map(item => (
            <ItemCard item={item} key={item?.id} />
          ))}
        </Space>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function StandaloneOwnerCards() ');
    expect(componentFile).to.contain('query Get_Owner_List {');
    expect(componentFile).to.contain('mutation Delete_Owner($id: BigInteger!) {');
    expectFileContainsIgnoreSpace(componentFile, expectCardsTag);

    // check that displayName function is written for 'cards'
    expect(fs.existsSync(displayNameFunctionFile)).to.be.true;
  });

  it('should generate standalone cards screen - Pet', async () => {

    const answers = {
      componentName: 'StandalonePetCards',
      route: 'standalone-pet-cards',
      shouldAddToMenu: false,
      query: petListQuery,
      mutation: petDeleteMutation,
      mode: 'edit',
      type: 'cards'
    };
    const componentPath = path.join(DEST_DIR, 'StandalonePetCards.tsx');
    // check that cleanup is completed, before test start
    expect(fs.existsSync(displayNameFunctionFile)).to.be.false;

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-list'), opts(DEST_DIR, answers, SCHEMA_PATH));

    const expectCardsTag = `
        <Space direction="vertical" className="card-space">
          {items.map(item => (
            <ItemCard item={item} key={item?.id} />
          ))}
        </Space>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function StandalonePetCards() ');
    expect(componentFile).to.contain('query Get_Pet_List {');
    expect(componentFile).to.contain('mutation Delete_Pet($id: BigInteger!) {');
    expectFileContainsIgnoreSpace(componentFile, expectCardsTag);

    // check that displayName function is written for 'cards'
    expect(fs.existsSync(displayNameFunctionFile)).to.be.true;
  });

});




