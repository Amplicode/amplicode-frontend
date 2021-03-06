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


describe('codegen pet cards management', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate pet cards management', async () => {

    const answers = {
      listComponentName: 'PetCards',
      itemComponentName: 'PetCardsEditor',
      route: 'pet-cards',
      type: 'cards',
      shouldAddToMenu: true,
      listQuery: petListQuery,
      detailsQuery: petDetailsQuery,
      deleteMutation: petDeleteMutation,
      upsertMutation: petUpsertMutation,
    };
    const componentPath = path.join(DEST_DIR, 'PetCards.tsx');
    const editorComponentPath = path.join(DEST_DIR, 'PetCardsEditor.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const editorComponentFile = fs.readFileSync(editorComponentPath, 'utf-8');
    const componentFile = fs.readFileSync(componentPath, 'utf-8');


    expectFileContainsIgnoreSpace(componentFile,
      `import { getTagDTODisplayName } from "core/display-name/getTagDTODisplayName";`);
    expectFileContainsIgnoreSpace(componentFile,
      `import { getPetDiseaseDTODisplayName } from "core/display-name/getPetDiseaseDTODisplayName";`);
    expectFileContainsIgnoreSpace(editorComponentFile,
      `import { getTagDTODisplayName } from "core/display-name/getTagDTODisplayName";`);
    expectFileContainsIgnoreSpace(editorComponentFile,
      `import { getPetDiseaseDTODisplayName } from "core/display-name/getPetDiseaseDTODisplayName";`);


    expectFileContainsIgnoreSpace(componentFile,
      `
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
    expectFileContainsIgnoreSpace(componentFile,
      `
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

    expectFileContainsIgnoreSpace(editorComponentFile,
      xToManyFormItem('tags', 'Tags', 'getTagDTODisplayName'));
    expectFileContainsIgnoreSpace(editorComponentFile,
      xToManyFormItem('diseases', 'Diseases', 'getPetDiseaseDTODisplayName'));

    expectFileContainsIgnoreSpace(editorComponentFile, `
      <Card className="narrow-layout">
        <Form
          onFinish={handleSubmit}
          onFinishFailed={handleClientValidationFailed}
          layout="vertical"
          form={form}
        >
          <FormFields item={item} fieldErrors={fieldErrors} />
          <ErrorMessages errorMessages={formErrors} />
          <FormButtons submitting={submitting} />
        </Form>
      </Card>    
    `);
  });
});

function xToManyFormItem(field: string, label: string, displayNameFunc: string) {
  return `
    <Form.Item
      name="${field}"
      label="${label}"
      help={<FieldErrorMessages path="${field}" fieldErrors={fieldErrors} />}
      validateStatus={hasError(fieldErrors, "${field}") ? "error" : "success"}
      getValueProps={object => ({
        value:
          object == null
            ? undefined
            : object.map((entry: Record<string, unknown>) =>
                ${displayNameFunc}(entry)
              )
      })}
    >
      <EntityRelationsField />
    </Form.Item>
`;
}
