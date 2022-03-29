import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {
  ownerDetailsQuery,
  ownerListQuery,
  petDetailsQuery,
  petListQuery
} from "../common/queries";
import {capitalizeFirst, unCapitalizeFirst} from "../../../../common/utils";

const GENERATOR_DIR = 'entity-management';

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', GENERATOR_DIR);

const expectTag = `
      <Space direction="vertical" className="list-space">
        <List
          itemLayout="horizontal"
          bordered
          dataSource={items}
          renderItem={item => <ListItem item={item} key={item?.id} />}
        />
      </Space>`;

describe('codegen readonly list', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate readonly list screen - Owner', async () => {

    const answers = {
      listComponentName: 'ReadOnlyOwnerList',
      itemComponentName: 'ReadOnlyOwnerListDetails',
      route: 'read-only-owner-list',
      shouldAddToMenu: true,
      listQuery: ownerListQuery,
      detailsQuery: ownerDetailsQuery,
      mode: 'view with details',
      type: 'list'
    };
    const componentPath = path.join(DEST_DIR, 'ReadOnlyOwnerList.tsx');
    const detailsComponentPath = path.join(DEST_DIR, 'ReadOnlyOwnerListDetails.tsx');

    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answers, SCHEMA_PATH));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ReadOnlyOwnerList() ');
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

  it('should generate readonly list screen - Pet', async () => {

    const answers = {
      listComponentName: 'ReadOnlyPetList',
      itemComponentName: 'ReadOnlyPetListDetails',
      route: 'read-only-pet-list',
      shouldAddToMenu: true,
      listQuery: petListQuery,
      detailsQuery: petDetailsQuery,
      mode: 'view with details',
      type: 'list'
    };
    const componentPath = path.join(DEST_DIR, 'ReadOnlyPetList.tsx');
    const detailsComponentPath = path.join(DEST_DIR, 'ReadOnlyPetListDetails.tsx');

    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answers, SCHEMA_PATH));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ReadOnlyPetList() ');
    expect(componentFile).to.contain('query Get_Pet_List {');
    expectFileContainsIgnoreSpace(componentFile, expectTag);

    const detailsComponentFile = fs.readFileSync(detailsComponentPath, 'utf-8');
    expect(detailsComponentFile).to.contain('query Get_Pet($id: BigInteger) {');

    // fields
    ['Identification Number', 'Birth Date'].forEach(label => {
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

});




