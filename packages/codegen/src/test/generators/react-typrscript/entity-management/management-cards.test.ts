import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {
  notNullScalarsDeleteMutation,
  notNullScalarsDetailsQuery,
  notNullScalarsListQuery,
  notNullScalarsUpsertMutation,
} from "../common/queries";
import {unCapitalizeFirst} from "../../../../common/utils";

const GENERATOR_DIR = 'entity-management';

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', GENERATOR_DIR);

describe('codegen cards management', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('should generate cards management screens - NotNullTestScalarsEntity', async () => {

    const answers = {
      listComponentName: 'TestNotNullScalarsCards',
      itemComponentName: 'TestNotNullScalarsCardsEditor',
      route: 'notnull-scalars-cards',
      shouldAddToMenu: true,
      listQuery: notNullScalarsListQuery,
      detailsQuery: notNullScalarsDetailsQuery,
      deleteMutation: notNullScalarsDeleteMutation,
      upsertMutation: notNullScalarsUpsertMutation,
    };
    const componentPath = path.join(DEST_DIR, 'TestNotNullScalarsCards.tsx');
    const editorComponentPath = path.join(DEST_DIR, 'TestNotNullScalarsCardsEditor.tsx');

    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answers, SCHEMA_PATH));

    const editorComponentFile = fs.readFileSync(editorComponentPath, 'utf-8');
    const componentFile = fs.readFileSync(componentPath, 'utf-8');

    [ 'Big Decimal Not Null', 'Big Int Not Null', 'String Not Null', 'Url Not Null'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field} ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);
    });

    const bigDecimalFormItem = `
      <Form.Item name="bigDecimalNotNull" label="Big Decimal Not Null">
        <InputNumber type={"number"} stringMode={true} autoFocus />
      </Form.Item>`;
    expectFileContainsIgnoreSpace(editorComponentFile, bigDecimalFormItem);

    const bigIntFormItem = `
      <Form.Item name="bigIntNotNull" label="Big Int Not Null">
        <InputNumber type={"number"} precision={0} stringMode={true} />
      </Form.Item>`;
    expectFileContainsIgnoreSpace(editorComponentFile, bigIntFormItem);

    const urlFormItem = `
      <Form.Item name="urlNotNull" label="Url Not Null">
        <Input />
      </Form.Item>`;
    expectFileContainsIgnoreSpace(editorComponentFile, urlFormItem);

    [ 'Local Time Not Null', 'Offset Time Not Null'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field}?.format("LTS") ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

      const formItem = `
      <Form.Item name="${field}" label="${label}">
        <TimePicker />
      </Form.Item>`;

      expectFileContainsIgnoreSpace(editorComponentFile, formItem);
    });

    [ 'Local Date Not Null'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field}?.format("LL") ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

      const formItem = `
      <Form.Item name="${field}" label="${label}">
        <DatePicker />
      </Form.Item>`;

      expectFileContainsIgnoreSpace(editorComponentFile, formItem);
    });

    [ 'Date Test Not Null', 'Local Date Time Not Null', 'Offset Date Time Not Null'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field}?.format("LLL") ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);

      const formItem = `
      <Form.Item name="${field}" label="${label}">
        <DatePicker showTime={{ format: "HH:mm:ss" }} />
      </Form.Item>`;

      expectFileContainsIgnoreSpace(editorComponentFile, formItem);
    });

  });

});




