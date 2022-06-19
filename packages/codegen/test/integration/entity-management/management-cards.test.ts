import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {expectFileContainsIgnoreSpace} from "../../../src/test/test-commons";
import {
  notNullScalarsDeleteMutation,
  notNullScalarsDetailsQuery,
  notNullScalarsListQuery,
  notNullScalarsUpsertMutation,
} from "../queries";
import {unCapitalizeFirst} from "../../../src/common/utils";

const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-management');
const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-management');

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

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const editorComponentFile = fs.readFileSync(editorComponentPath, 'utf-8');
    const componentFile = fs.readFileSync(componentPath, 'utf-8');

    [
      'Big Decimal Not Null',
      'Big Int Not Null',
      'String Not Null',
    ].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field} ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);
    });

    const urlValueWithLabel = `
      <ValueWithLabel
        key="urlNotNull"
        label="Url Not Null"
        value={item.urlNotNull ?? undefined}
        isUrl={true}
      />`;
    expectFileContainsIgnoreSpace(componentFile, urlValueWithLabel);

    const bigDecimalFormItem = `
      <Form.Item name="bigDecimalNotNull" label="Big Decimal Not Null">
        <InputNumber type="number" stringMode autoFocus />
      </Form.Item>`;
    expectFileContainsIgnoreSpace(editorComponentFile, bigDecimalFormItem);

    const bigIntFormItem = `
      <Form.Item name="bigIntNotNull" label="Big Int Not Null">
        <InputNumber type="number" precision={0} stringMode />
      </Form.Item>`;
    expectFileContainsIgnoreSpace(editorComponentFile, bigIntFormItem);

    const urlFormItem = `
      <Form.Item name="urlNotNull" label="Url Not Null">
        <Input type="url" />
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




