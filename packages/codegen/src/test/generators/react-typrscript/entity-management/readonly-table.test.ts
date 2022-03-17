import fs from "fs";
import {promisify} from "util";
import path from "path";
import {generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {
  ownerDetailsQuery,
  ownerListQuery,
  petDetailsQuery,
  petListQuery
} from "../common/queries";

const rimraf = promisify(require('rimraf'));
const GENERATOR_DIR = 'entity-management';

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', GENERATOR_DIR);
const displayNameFunctionFile = path.join(DEST_DIR, 'display-name', 'getOwnerDTODisplayName.ts');

const expectTag = `
      <Space direction="vertical" style={{ width: "100%" }}>
        <TableSection
          items={items}
          loading={loading}
          error={error}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
        {/* <Pagination /> - in future */}
      </Space>`;

describe('codegen readonly table', () => {

  before(async () => {
    await rimraf(`${DEST_DIR}/{*,.*}`);
    !fs.existsSync(DEST_DIR) && fs.mkdirSync(DEST_DIR, {recursive: true});

    // avoid exception on read i18n messages in mvp.ts, create file first TODO - fix in mpv.ts 'addScreenI18nKeyEn'
    fs.mkdirSync(path.join(DEST_DIR, 'core', 'i18n'), {recursive: true});
    fs.writeFileSync(path.join(DEST_DIR, 'core', 'i18n', 'en.json'), '{}');
  });

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
    expect(!fs.existsSync(componentPath));
    expect(!fs.existsSync(displayNameFunctionFile));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answers, SCHEMA_PATH));

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
    expect(!fs.existsSync(componentPath));
    expect(!fs.existsSync(displayNameFunctionFile));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answers, SCHEMA_PATH));

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
  });

});




