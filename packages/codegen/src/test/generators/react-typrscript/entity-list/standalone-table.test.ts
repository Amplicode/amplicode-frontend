import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {ownerDeleteMutation, ownerListQuery, petDeleteMutation, petListQuery} from "../common/queries";

const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-list');
const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-list');
const displayNameFiles = [
  path.join(DEST_DIR, 'core', 'display-name', 'getOwnerDTODisplayName.ts'),
  path.join(DEST_DIR, 'core', 'display-name', 'getPetTypeDTODisplayName.ts')];

const expectTag = `
    <Space direction="vertical" className="table-space entity-table">
      <Table
        dataSource={dataSource as object[]}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return {
            onClick: () => {
              const id = (data as ItemType)?.id;
              setSelectedRowId(id === selectedRowId ? null : id);
            }
          };
        }}
        scroll={{ x: true }}
      />
    </Space>`;


describe('codegen standalone table', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

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
    expect(fs.existsSync(componentPath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

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
    displayNameFiles.forEach(file => expect(fs.existsSync(file)).to.be.false);
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
    expect(fs.existsSync(componentPath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const expectDataSource = `
      const dataSource = items
        .filter(item => item != null)
        .map(item => ({
          ...item,
          ...{
            birthDate: item!.birthDate?.format("LL") ?? undefined,
            type: getPetTypeDTODisplayName(item!.type ?? undefined),
            owner: getOwnerDTODisplayName(item!.owner ?? undefined)
          }
        }));    
    `;

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
    expectFileContainsIgnoreSpace(componentFile, expectDataSource);

    // check that displayName function is written for 'table'
    displayNameFiles.forEach(file => expect(fs.existsSync(file)).to.be.true);
  });

});
