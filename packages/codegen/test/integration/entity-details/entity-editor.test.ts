import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {expect} from "chai";
import {MvpEntityEditorAnswers} from "../../../src/generators/react-typescript/entity-details/answers";
import {getOwnerQuery, ownerUpsertMutation, scalarsDetailsQuery, scalarsUpsertMutation} from "../queries";

const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-details');
const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-details');

describe('codegen entity-editor test', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

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
    await generate(GENERATOR_DIR, opts(DEST_DIR, editorAnswers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function OwnerEditor');
    expect(componentFile).to.contain('query Get_Owner($id: BigInteger) {');
    expect(componentFile).to.contain('mutation Update_Owner($input: OwnerInputDTO) {');
  });


  it('should generate entity editor screen - ScalarsTestEntity', async () => {

    const editorAnswers:MvpEntityEditorAnswers = {
      query: scalarsDetailsQuery,
      route: 'scalars-editor',
      refetchQueryName: 'Get_Scalars',
      mutation: scalarsUpsertMutation,
      componentName: 'ScalarsEditor',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'ScalarsEditor.tsx');
    await generate(GENERATOR_DIR, opts(DEST_DIR, editorAnswers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ScalarsEditor');
    expect(componentFile).to.contain('query Get_Scalars($id: ID) {');
    expect(componentFile).to.contain('mutation Update_Scalars($input: ScalarsTestEntityInput) {');
  });

});
