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


describe('codegen pet table management', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate pet table management', async () => {

    const answers = {
      listComponentName: 'PetTable',
      itemComponentName: 'PetTableEditor',
      route: 'pet-table',
      type: 'table',
      shouldAddToMenu: true,
      listQuery: petListQuery,
      itemQuery: petDetailsQuery,
      deleteMutation: petDeleteMutation,
      upsertMutation: petUpsertMutation,
    };
    const componentPath = path.join(DEST_DIR, 'PetTable.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');

    expectFileContainsIgnoreSpace(componentFile,
      `import { getTagDTODisplayName } from "core/display-name/getTagDTODisplayName";`);
    expectFileContainsIgnoreSpace(componentFile,
      `import { getPetDiseaseDTODisplayName } from "core/display-name/getPetDiseaseDTODisplayName";`);

    expectFileContainsIgnoreSpace(componentFile,`
    {
      title: "Diseases",
      dataIndex: "diseases",
      key: "diseases"
    }
    `);
    expectFileContainsIgnoreSpace(componentFile,`
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags"
    }
    `);

    expectFileContainsIgnoreSpace(componentFile,`
    tags:
      item &&
      item.tags &&
      item.tags
        .map(entry => getTagDTODisplayName(entry))
        .filter(entry => entry !== "")
        .join(", ")
    `);
    expectFileContainsIgnoreSpace(componentFile,`
    diseases:
      item &&
      item.diseases &&
      item.diseases
        .map(entry => getPetDiseaseDTODisplayName(entry))
        .filter(entry => entry !== "")
        .join(", ")
    `);
  });
});
