import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";
import {
  ownerDetailsQuery,
  ownerListQuery,
  petDetailsQuery,
  petListQuery, scalarsDetailsQuery, scalarsListQuery
} from "../queries";
import {capitalizeFirst, unCapitalizeFirst} from "../../../src/common/utils";

const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-management');
const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-management');

describe('codegen readonly cards', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate readonly cards screen - Owner', async () => {

    const answers = {
      listComponentName: 'ReadOnlyOwnerCards',
      itemComponentName: 'ReadOnlyOwnerCardsDetails',
      route: 'read-only-owner-cards',
      shouldAddToMenu: true,
      listQuery: ownerListQuery,
      itemQuery: ownerDetailsQuery,
      mode: 'view with details',
      type: 'cards'
    };
    const componentPath = path.join(DEST_DIR, 'ReadOnlyOwnerCards.tsx');
    const detailsComponentPath = path.join(DEST_DIR, 'ReadOnlyOwnerCardsDetails.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const expectTag = `
    <Space direction="vertical" className="card-space">
      <Cards items={items} loading={loading} error={error} />
    </Space>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ReadOnlyOwnerCards() ');
    expect(componentFile).to.contain('query Get_Owner_List {');
    expectFileContainsIgnoreSpace(componentFile, expectTag);

    const detailsComponentFile = fs.readFileSync(detailsComponentPath, 'utf-8');
    expect(detailsComponentFile).to.contain('query Get_Owner($id: BigInteger) {');

    [ 'First Name', 'Last Name', 'City', 'Address', 'Telephone', 'Email'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field} ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

      const descriptions = `
        <Descriptions.Item label={<strong>${label}</strong>}>
          {item.${field} ?? undefined}
        </Descriptions.Item>`;

      expectFileContainsIgnoreSpace(detailsComponentFile, descriptions);
    });

  });

  it('should generate readonly cards screen - Pet', async () => {

    const answers = {
      listComponentName: 'ReadOnlyPetCards',
      itemComponentName: 'ReadOnlyPetCardsDetails',
      route: 'read-only-pet-cards',
      shouldAddToMenu: true,
      listQuery: petListQuery,
      itemQuery: petDetailsQuery,
      mode: 'view with details',
      type: 'cards'
    };
    const componentPath = path.join(DEST_DIR, 'ReadOnlyPetCards.tsx');
    const detailsComponentPath = path.join(DEST_DIR, 'ReadOnlyPetCardsDetails.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const expectTag = `
    <Space direction="vertical" className="card-space">
      <Cards items={items} loading={loading} error={error} />
    </Space>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ReadOnlyPetCards() ');
    expect(componentFile).to.contain('query Get_Pet_List {');

    expectFileContainsIgnoreSpace(componentFile, expectTag);

    const detailsComponentFile = fs.readFileSync(detailsComponentPath, 'utf-8');
    expect(detailsComponentFile).to.contain('query Get_Pet($id: BigInteger) {');

    // fields
    ['Identification Number'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field} ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

      const descriptions = `
        <Descriptions.Item label={<strong>${label}</strong>}>
          {item.${field} ?? undefined}
        </Descriptions.Item>`;

      expectFileContainsIgnoreSpace(detailsComponentFile, descriptions);
    });

    // Date fields
    ['Birth Date'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field}?.format("LL") ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

      const descriptions = `
        <Descriptions.Item label={<strong>${label}</strong>}>
          {item.${field}?.format("LL") ?? undefined}
        </Descriptions.Item>`;

      expectFileContainsIgnoreSpace(detailsComponentFile, descriptions);
    });

    // relation fields
    ['Owner'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={get${capitalizeFirst(field)}DTODisplayName(item.${field} ?? undefined)}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

      const descriptions = `
        <Descriptions.Item label={<strong>${label}</strong>}>
          {get${capitalizeFirst(field)}DTODisplayName(item.${field} ?? undefined)}
        </Descriptions.Item>`;

      expectFileContainsIgnoreSpace(detailsComponentFile, descriptions);
    });

    // enum PetType
    const valueWithLabel = `
      <ValueWithLabel
        key="type"
        label="Type"
        value={getPetTypeDTODisplayName(item.type ?? undefined)}
      />`;

    expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

    const descriptions = `
        <Descriptions.Item label={<strong>Type</strong>}>
          {getPetTypeDTODisplayName(item.type ?? undefined)}
        </Descriptions.Item>`;

    expectFileContainsIgnoreSpace(detailsComponentFile, descriptions);
  });

  it('should generate readonly cards screen - ScalarsTestEntity', async () => {

    const answers = {
      listComponentName: 'ReadOnlyScalarsCards',
      itemComponentName: 'ReadOnlyScalarsCardsDetails',
      route: 'read-only-scalars-cards',
      shouldAddToMenu: true,
      listQuery: scalarsListQuery,
      itemQuery: scalarsDetailsQuery,
      mode: 'view with details',
      type: 'cards'
    };
    const componentPath = path.join(DEST_DIR, 'ReadOnlyScalarsCards.tsx');
    const detailsComponentPath = path.join(DEST_DIR, 'ReadOnlyScalarsCardsDetails.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ReadOnlyScalarsCards() ');
    expect(componentFile).to.contain('query Get_Scalars_List {');
    expect((componentFile.match(/<ValueWithLabel/g) || []).length).to.eq(24);

    const detailsComponentFile = fs.readFileSync(detailsComponentPath, 'utf-8');
    expect(detailsComponentFile).to.contain('query Get_Scalars($id: ID) {');
    expect((detailsComponentFile.match(/<Descriptions.Item/g) || []).length).to.eq(24);

    expectFileContainsIgnoreSpace(detailsComponentFile, `
    <Descriptions.Item label={<strong>Url</strong>}>
          {item.url && (
            <a target="_blank" rel="noreferrer" href={item.url}>
              {item.url}
            </a>
          )}
        </Descriptions.Item>`)
  });

});




