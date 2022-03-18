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

describe('codegen standalone list', () => {

  before(async () => {
    await rimraf(`${DEST_DIR}/{*,.*}`);
    !fs.existsSync(DEST_DIR) && fs.mkdirSync(DEST_DIR, {recursive: true});

    // avoid exception on read i18n messages in mvp.ts, create file first TODO - fix in mpv.ts 'addScreenI18nKeyEn'
    fs.mkdirSync(path.join(DEST_DIR, 'core', 'i18n', 'messages'), {recursive: true});
    fs.writeFileSync(path.join(DEST_DIR, 'core', 'i18n', 'messages', 'en.json'), '{}');
  });


  it('should generate standalone list screen - Owner', async () => {

    const standaloneListAnswers = {
      componentName: 'StandaloneOwnerList',
      route: 'standalone-owner-list',
      shouldAddToMenu: false,
      query: ownerListQuery,
      mutation: ownerDeleteMutation,
      type: 'list',
      mode: 'edit'
    };
    const componentPath = path.join(DEST_DIR, 'StandaloneOwnerList.tsx');
    // check that cleanup is completed, before test start
    expect(!fs.existsSync(componentPath));
    expect(!fs.existsSync(displayNameFunctionFile));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-list'), opts(DEST_DIR, standaloneListAnswers, SCHEMA_PATH));

    const expectListTag = `
        <Space direction="vertical" className="list-space">
          <List
            itemLayout="horizontal"
            bordered
            dataSource={items}
            renderItem={item => <ListItem item={item} key={item?.id} />}
          />
        </Space>`

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function StandaloneOwnerList() ');
    expect(componentFile).to.contain('query Get_Owner_List {');
    expect(componentFile).to.contain('mutation Delete_Owner($id: BigInteger!) {');
    expectFileContainsIgnoreSpace(componentFile, expectListTag);

    // check that displayName function is NOT written for 'list'
    expect(!fs.existsSync(displayNameFunctionFile));
  });

  it('should generate standalone list screen - Pet', async () => {

    const answers = {
      componentName: 'StandalonePetList',
      route: 'standalone-pet-list',
      shouldAddToMenu: false,
      query: petListQuery,
      mutation: petDeleteMutation,
      mode: 'edit',
      type: 'list'
    };
    const componentPath = path.join(DEST_DIR, 'StandalonePetList.tsx');
    // check that cleanup is completed, before test start
    expect(!fs.existsSync(componentPath));
    expect(!fs.existsSync(displayNameFunctionFile));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-list'), opts(DEST_DIR, answers, SCHEMA_PATH));

    const expectCardsTag = `
    <Space direction="vertical" className="list-space">
    <List
      itemLayout="horizontal"
      bordered
      dataSource={items}
      renderItem={item => <ListItem item={item} key={item?.id} />}
      />
    </Space>`

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function StandalonePetList() ');
    expect(componentFile).to.contain('query Get_Pet_List {');
    expect(componentFile).to.contain('mutation Delete_Pet($id: BigInteger!) {');
    expectFileContainsIgnoreSpace(componentFile, expectCardsTag);

    // check that displayName function is written for 'list'
    expect(!fs.existsSync(displayNameFunctionFile));
  });

});
