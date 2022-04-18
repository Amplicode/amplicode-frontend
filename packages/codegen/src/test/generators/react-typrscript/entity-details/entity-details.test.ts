import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {MvpEntityEditorAnswers} from "../../../../generators/react-typescript/entity-details/answers";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {getOwnerQuery, ownerUpsertMutation} from "../common/queries";

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', 'entity-details');

describe('codegen entity-details test', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate entity details screen', async () => {

    const detailsAnswers = {
      query: getOwnerQuery,
      componentName: 'OwnerDetails',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'OwnerDetails.tsx');

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-details'), opts(DEST_DIR, detailsAnswers, SCHEMA_PATH));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function OwnerDetails');
    expect(componentFile).to.contain('query Get_Owner($id: BigInteger) {');
  });


  it('should generate entity editor screen - Owner', async () => {

    const editorAnswers:MvpEntityEditorAnswers = {
      query: getOwnerQuery,
      route: 'owner-editor',
      refetchQueryName: 'Get_Owner',
      mutation: ownerUpsertMutation,
      componentName: 'OwnerEditor',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'OwnerEditor.tsx');

    await generate(path.join(GENERATORS_DIR, 'react-typescript', 'entity-details'), opts(DEST_DIR, editorAnswers, SCHEMA_PATH));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function OwnerEditor');
    expect(componentFile).to.contain('query Get_Owner($id: BigInteger) {');
    expect(componentFile).to.contain('mutation Update_Owner($input: OwnerInputDTOInput) {');
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
      route: 'test-dto-editor',
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
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox />
        </Form.Item>`;

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function TestDtoEditor');
    // compare form item ignore spaces
    expectFileContainsIgnoreSpace(componentFile, expectBoolFormItem);
  });

});
