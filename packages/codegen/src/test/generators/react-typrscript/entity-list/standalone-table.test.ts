import fs from "fs";
import {promisify} from "util";
import path from "path";
import {generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {ownerDeleteMutation, ownerListQuery, petDeleteMutation, petListQuery} from "../common/queries";


const rimraf = promisify(require('rimraf'));

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', 'entity-list');
const displayNameFunctionFile = path.join(DEST_DIR, 'display-name', 'getOwnerDTODisplayName.ts');

describe('codegen standalone table', () => {

  before(async () => {
    await rimraf(`${DEST_DIR}/{*,.*}`);
    !fs.existsSync(DEST_DIR) && fs.mkdirSync(DEST_DIR, {recursive: true});

    // avoid exception on read i18n messages in mvp.ts, create file first TODO - fix in mpv.ts 'addScreenI18nKeyEn'
    fs.mkdirSync(path.join(DEST_DIR, 'core', 'i18n', 'messages'), {recursive: true});
    fs.writeFileSync(path.join(DEST_DIR, 'core', 'i18n', 'messages', 'en.json'), '{}');
  });


  it('should generate standalone table screen - Owner', async () => {

    const answers = {
      componentName: 'StandaloneOwnerTable',
      route: 'standalone-owner-table',
      shouldAddToMenu: false,
      query: ownerListQuery,
      mutation: ownerDeleteMutation,
      type: 'table',
      mode: 'edit'
    };
    const componentPath = path.join(DEST_DIR, 'StandaloneOwnerTable.tsx');
    // check that cleanup is completed, before test start
    expect(!fs.existsSync(componentPath));
    expect(!fs.existsSync(displayNameFunctionFile));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-list'), opts(DEST_DIR, answers, SCHEMA_PATH));

    const expectTag = `
    <Space direction="vertical" className="table-space">
      <Table
        dataSource={items.filter(item => item != null) as object[]}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return { onClick: () => setSelectedRowId((data as ItemType)?.id) };
        }}
      />
    </Space>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function StandaloneOwnerTable() ');
    expect(componentFile).to.contain('query Get_Owner_List {');
    expect(componentFile).to.contain('mutation Delete_Owner($id: BigInteger!) {');

    // columns
    expect(componentFile).to.contain('title: "Address",');
    expect(componentFile).to.contain('title: "City",');
    expect(componentFile).to.contain('title: "Email",');
    expect(componentFile).to.contain('title: "First Name",');
    expect(componentFile).to.contain('title: "Last Name",');
    expect(componentFile).to.contain('title: "Telephone",');

    expectFileContainsIgnoreSpace(componentFile, expectTag);

    // check that displayName function is NOT written for 'table'
    expect(!fs.existsSync(displayNameFunctionFile));
  });

  it('should generate standalone table screen - Pet', async () => {

    const answers = {
      componentName: 'StandalonePetTable',
      route: 'standalone-pet-table',
      shouldAddToMenu: false,
      query: petListQuery,
      mutation: petDeleteMutation,
      mode: 'edit',
      type: 'table'
    };

    const componentPath = path.join(DEST_DIR, 'StandalonePetTable.tsx');
    // check that cleanup is completed, before test start
    expect(!fs.existsSync(componentPath));
    expect(!fs.existsSync(displayNameFunctionFile));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-list'), opts(DEST_DIR, answers, SCHEMA_PATH));

    const expectTag = `
    <Space direction="vertical" className="table-space">
      <Table
        dataSource={items.filter(item => item != null) as object[]}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return { onClick: () => setSelectedRowId((data as ItemType)?.id) };
        }}
      />
    </Space>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function StandalonePetTable() ');
    expect(componentFile).to.contain('query Get_Pet_List {');
    expect(componentFile).to.contain('mutation Delete_Pet($id: BigInteger!) {');

    // columns
    expect(componentFile).to.contain('title: "Birth Date",');
    expect(componentFile).to.contain('title: "Identification Number",');
    expect(componentFile).to.contain('title: "Owner",');
    expect(componentFile).to.contain('title: "Type",');

    expectFileContainsIgnoreSpace(componentFile, expectTag);

    // check that displayName function is written for 'table'
    expect(fs.existsSync(displayNameFunctionFile));
  });

});
