import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";
import {
  ownerDeleteMutation,
  ownerListQuery,
  petDeleteMutation,
  petListQuery, scalarsDeleteMutation,
  scalarsListQuery
} from "../queries";

const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-list');
const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-list');
const displayNameFuncFilePath = path.join(DEST_DIR, 'core', 'display-name', 'getOwnerDTODisplayName.ts');

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
    expect(fs.existsSync(displayNameFuncFilePath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

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
    expect(fs.existsSync(displayNameFuncFilePath)).to.be.true;

    const displayNameFuncFile = fs.readFileSync(displayNameFuncFilePath, 'utf-8');
    expectFileContainsIgnoreSpace(displayNameFuncFile, `
      if (entityInstance.firstName != null && entityInstance.lastName != null) {
        return String(\`\${entityInstance.firstName} \${entityInstance.lastName}\`);
      }    
    `);
    expectFileContainsIgnoreSpace(displayNameFuncFile, `
      if (entityInstance.firstName != null) {
        return String(entityInstance.firstName);
      }
      if (entityInstance.lastName != null) {
        return String(entityInstance.lastName);
      }
    `);
    expectFileContainsIgnoreSpace(displayNameFuncFile, `
      if (entityInstance.id != null) {
        return String(entityInstance.id);
      }
    `);

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
    expect(fs.existsSync(displayNameFuncFilePath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

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
    expect(fs.existsSync(displayNameFuncFilePath)).to.be.true;
  });

  it('should generate standalone cards screen - ScalarsTestEntity', async () => {

    const answers = {
      componentName: 'StandaloneScalarsCards',
      route: 'standalone-scalars-cards',
      shouldAddToMenu: false,
      query: scalarsListQuery,
      mutation: scalarsDeleteMutation,
      mode: 'edit',
      type: 'cards'
    };
    const componentPath = path.join(DEST_DIR, 'StandaloneScalarsCards.tsx');
    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function StandaloneScalarsCards() ');
    expect(componentFile).to.contain('query Get_Scalars_List {');
    expect(componentFile).to.contain('mutation Delete_Scalars($id: ID!) {');
    expect((componentFile.match(/<ValueWithLabel/g) || []).length).to.eq(24);
  });

});




