import fs from "fs";
import {promisify} from "util";
import path from "path";
import {generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {MvpEntityEditorAnswers} from "../../../../generators/react-typescript/entity-details/answers";
const rimraf = promisify(require('rimraf'));

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', 'entity-details');

const getOwnerQuery = `
query Get_Owner($id: BigInteger) {
  owner(id: $id) {
    id
    firstName
    lastName
    city
    address
    email
    telephone
  }
}
`;

const ownerUpsertMutation = `
mutation Update_Owner($input: OwnerInputDTOInput) {
  update_Owner(input: $input) {
    id
  }
}
`;

describe('codegen entity-details test', () => {

  before(async () => {
    await rimraf(`${DEST_DIR}/{*,.*}`);
    !fs.existsSync(DEST_DIR) && fs.mkdirSync(DEST_DIR, {recursive: true});

    // avoid exception on read i18n messages in mvp.ts, create file first TODO - fix in mpv.ts 'addScreenI18nKeyEn'
    fs.mkdirSync(path.join(DEST_DIR, 'core', 'i18n'), {recursive: true});
    fs.writeFileSync(path.join(DEST_DIR, 'core', 'i18n', 'en.json'), '{}');
  });

  it('should generate entity details screen', async () => {

    const detailsAnswers = {
      query: getOwnerQuery,
      componentName: 'OwnerDetails',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'OwnerDetails.tsx');
    expect(!fs.existsSync(componentPath));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-details'), opts(DEST_DIR, detailsAnswers, SCHEMA_PATH));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export const OwnerDetails');
    expect(componentFile).to.contain('query Get_Owner($id: BigInteger) {');
  });


  it('should generate entity editor screen - Owner', async () => {

    const editorAnswers:MvpEntityEditorAnswers = {
      query: getOwnerQuery,
      refetchQueryName: 'Get_Owner',
      mutation: ownerUpsertMutation,
      componentName: 'OwnerEditor',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'OwnerEditor.tsx');
    expect(!fs.existsSync(componentPath));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-details'), opts(DEST_DIR, editorAnswers, SCHEMA_PATH));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export const OwnerEditor');
    expect(componentFile).to.contain('query Get_Owner($id: BigInteger) {');
    expect(componentFile).to.contain('mutation Update_Owner($input: OwnerInputDTOInput) {');
    expect(componentFile).to.contain('refetchQueries: ["Get_Owner"]');
  });


  it('should generate entity editor screen - TestDTO ', async () => {

    const updateMutation = `
      mutation Update_TestDto($input: TestInputDTOInput) {
        update_Test(input: $input) {
          id
        }
      }`;

    const findQuery = `
      query Get_TestDto($id: BigInteger) {
        test(id: $id) {
          id
          electric
          name
        }
      }`;

    const answers:MvpEntityEditorAnswers = {
      query: findQuery,
      refetchQueryName: 'Get_TestDto',
      mutation: updateMutation,
      componentName: 'TestDtoEditor',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'TestDtoEditor.tsx');
    expect(!fs.existsSync(componentPath));

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-details'), opts(DEST_DIR, answers, SCHEMA_PATH));

    const expectBoolFormItem = `
        <Form.Item
          name="bool"
          label="Bool"
          style={{ marginBottom: "12px" }}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export const TestDtoEditor');
    // compare form item ignore spaces
    expect(componentFile.replace(/\s/g,'')).to.contain(expectBoolFormItem.replace(/\s/g,''));
  });

});
