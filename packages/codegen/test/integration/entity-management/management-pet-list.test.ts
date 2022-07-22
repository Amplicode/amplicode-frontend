import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {
  petDeleteMutation,
  petDetailsQuery,
  petListQuery,
  petUpsertMutation
} from "../queries";
import path from "path";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";
import fs from "fs";


const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-management');
const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-management');


describe('codegen pet list management', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate pet list management', async () => {

    const answers = {
      listComponentName: 'PetList',
      itemComponentName: 'PetListEditor',
      route: 'pet-list',
      type: 'list',
      shouldAddToMenu: true,
      listQuery: petListQuery,
      itemQuery: petDetailsQuery,
      deleteMutation: petDeleteMutation,
      upsertMutation: petUpsertMutation,
    };
    const componentPath = path.join(DEST_DIR, 'PetList.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');

    expectFileContainsIgnoreSpace(componentFile,
      `import { getTagDTODisplayName } from "core/display-name/getTagDTODisplayName";`);
    expectFileContainsIgnoreSpace(componentFile,
      `import { getPetDiseaseDTODisplayName } from "core/display-name/getPetDiseaseDTODisplayName";`);

    expectFileContainsIgnoreSpace(componentFile,`
      <ValueWithLabel
        key="diseases"
        label="Diseases"
        value={
          item.diseases &&
          item.diseases
            .map(entry => getPetDiseaseDTODisplayName(entry))
            .filter(entry => entry !== "")
        }
      />
    `);
    expectFileContainsIgnoreSpace(componentFile,`
      <ValueWithLabel
        key="tags"
        label="Tags"
        value={
          item.tags &&
          item.tags
            .map(entry => getTagDTODisplayName(entry))
            .filter(entry => entry !== "")
        }
      />
    `);

  });
});
