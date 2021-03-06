import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";
import {
  ownerDetailsQuery,
  ownerListQuery,
  petDetailsQuery,
  petListQuery
} from "../queries";

const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-management');
const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-management');

const expectTag = `
      <Space direction="vertical" className="table-space">
        <TableSection
          items={items}
          loading={loading}
          error={error}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
      </Space>`;

describe('codegen readonly table', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate readonly table screen - Owner', async () => {

    const answers = {
      listComponentName: 'ReadOnlyOwnerTable',
      itemComponentName: 'ReadOnlyOwnerTableDetails',
      route: 'read-only-owner-table',
      shouldAddToMenu: true,
      listQuery: ownerListQuery,
      detailsQuery: ownerDetailsQuery,
      mode: 'view with details',
      type: 'table'
    };
    const componentPath = path.join(DEST_DIR, 'ReadOnlyOwnerTable.tsx');
    const detailsComponentPath = path.join(DEST_DIR, 'ReadOnlyOwnerTableDetails.tsx');
    // check that cleanup is completed, before test start
    expect(fs.existsSync(componentPath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ReadOnlyOwnerTable() ');
    expect(componentFile).to.contain('query Get_Owner_List {');
    expectFileContainsIgnoreSpace(componentFile, expectTag);

    const detailsComponentFile = fs.readFileSync(detailsComponentPath, 'utf-8');
    expect(detailsComponentFile).to.contain('query Get_Owner($id: BigInteger) {');

    // columns
    expect(componentFile).to.contain('title: "Address",');
    expect(componentFile).to.contain('title: "City",');
    expect(componentFile).to.contain('title: "Email",');
    expect(componentFile).to.contain('title: "First Name",');
    expect(componentFile).to.contain('title: "Last Name",');
    expect(componentFile).to.contain('title: "Telephone",');

    // getXXXName file
    expect(fs.existsSync(path.join(DEST_DIR, 'core', 'display-name', 'getOwnerDTODisplayName.ts'))).to.be.true;
  });

  it('should generate readonly table screen - Pet', async () => {

    const answers = {
      listComponentName: 'ReadOnlyPetTable',
      itemComponentName: 'ReadOnlyPetTableDetails',
      route: 'read-only-pet-table',
      shouldAddToMenu: true,
      listQuery: petListQuery,
      detailsQuery: petDetailsQuery,
      mode: 'view with details',
      type: 'table'
    };
    const componentPath = path.join(DEST_DIR, 'ReadOnlyPetTable.tsx');
    const detailsComponentPath = path.join(DEST_DIR, 'ReadOnlyPetTableDetails.tsx');
    // check that cleanup is completed, before test start
    expect(fs.existsSync(componentPath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ReadOnlyPetTable() ');
    expect(componentFile).to.contain('query Get_Pet_List {');
    expectFileContainsIgnoreSpace(componentFile, expectTag);

    const detailsComponentFile = fs.readFileSync(detailsComponentPath, 'utf-8');
    expect(detailsComponentFile).to.contain('query Get_Pet($id: BigInteger) {');

    // columns
    expect(componentFile).to.contain('title: "Birth Date",');
    expect(componentFile).to.contain('title: "Identification Number",');
    expect(componentFile).to.contain('title: "Owner",');
    expect(componentFile).to.contain('title: "Type",');

    const displayNameFiles = [
      path.join(DEST_DIR, 'core', 'display-name', 'getOwnerDTODisplayName.ts'),
      path.join(DEST_DIR, 'core', 'display-name', 'getPetTypeDTODisplayName.ts')];
    // getXXXName files
    displayNameFiles.forEach(file => expect(fs.existsSync(file)).to.be.true);
  });

});




