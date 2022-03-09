import fs from "fs";
import {promisify} from "util";
import path from "path";
import {generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
const rimraf = promisify(require('rimraf'));

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', 'entity-list');

describe('codegen entity-list test', () => {

  const ownerListQuery = `
query Get_Owner_List {
  ownerList {
    id
    firstName
    lastName
    city
    address
    telephone
    email
  }
}
`;

  const ownerDeleteMutation = `
mutation Delete_Owner($id: BigInteger!) {
  delete_Owner(id: $id)
}
`;

  before(async () => {
    await rimraf(`${DEST_DIR}/{*,.*}`);
    !fs.existsSync(DEST_DIR) && fs.mkdirSync(DEST_DIR, {recursive: true});

    // avoid exception on read i18n messages in mvp.ts, create file first TODO - fix in mpv.ts 'addScreenI18nKeyEn'
    fs.mkdirSync(path.join(DEST_DIR, 'core', 'i18n'), {recursive: true});
    fs.writeFileSync(path.join(DEST_DIR, 'core', 'i18n', 'en.json'), '{}');
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
    expect(!fs.existsSync(componentPath));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-list'), opts(DEST_DIR, standaloneListAnswers, SCHEMA_PATH));

    const expectListTag = `
        <Space direction="vertical" style={{ width: "100%" }}>
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
    expect(componentFile.replace(/\s/g,'')).to.contain(expectListTag.replace(/\s/g,''));
  });


});


