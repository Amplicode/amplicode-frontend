import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {expect} from "chai";
import {getOwnerQuery, petDetailsQuery, scalarsDetailsQuery} from "../queries";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";

const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-details');
const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-details');

describe('codegen entity-details test', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate entity details screen - Owner', async () => {

    const detailsAnswers = {
      query: getOwnerQuery,
      componentName: 'OwnerDetails',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'OwnerDetails.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, detailsAnswers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function OwnerDetails');
    expect(componentFile).to.contain('query Get_Owner($id: BigInteger) {');
  });

  it('should generate entity details screen - ScalarsTestEntity', async () => {

    const detailsAnswers = {
      query: scalarsDetailsQuery,
      componentName: 'ScalarsDetails',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'ScalarsDetails.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, detailsAnswers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ScalarsDetails');
    expect(componentFile).to.contain('query Get_Scalars($id: ID) {');
    expect((componentFile.match(/<Descriptions.Item/g) || []).length).to.eq(24);
  });

  it('should generate entity details screen - Pet', async () => {

    const detailsAnswers = {
      query: petDetailsQuery,
      componentName: 'PetDetails',
      shouldAddToMenu: false
    };

    const componentPath = path.join(DEST_DIR, 'PetDetails.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, detailsAnswers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function PetDetails');
    expect(componentFile).to.contain('query Get_Pet($id: BigInteger) {');

    expectFileContainsIgnoreSpace(componentFile, `
        <Descriptions.Item label={<strong>Tags</strong>}>
          {item.tags &&
            item.tags
              .map(entry => getTagDTODisplayName(entry))
              .filter(entry => entry !== "")
              .join(", ")}
        </Descriptions.Item>
    `);
    expectFileContainsIgnoreSpace(componentFile, `
        <Descriptions.Item label={<strong>Diseases</strong>}>
          {item.diseases &&
            item.diseases
              .map(entry => getPetDiseaseDTODisplayName(entry))
              .filter(entry => entry !== "")
              .join(", ")}
        </Descriptions.Item>
    `);
  });


});
