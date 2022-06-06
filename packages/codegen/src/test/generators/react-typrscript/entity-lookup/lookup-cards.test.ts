import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {ownerListQuery, scalarsListQuery} from "../common/queries";
import {expectFileContainsIgnoreSpace} from "../../../test-commons";
import {unCapitalizeFirst} from "../../../../common/utils";


const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-lookup');
const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-lookup');
const displayNameFunctionFile = path.join(DEST_DIR, 'core', 'display-name', 'getOwnerDTODisplayName.ts');

describe('codegen lookup cards', () => {

  before(async () => { await cleanup(DEST_DIR)});

  it('should generate lookup cards screen - Owner', async () => {

    const answers = {
      componentName: 'OwnerLookup',
      route: 'owner-lookup-cards',
      query: ownerListQuery
    };
    const componentPath = path.join(DEST_DIR, 'OwnerLookup.tsx');
    // check that cleanup is completed, before test start
    expect(fs.existsSync(componentPath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function OwnerLookup(props: OwnerLookupProps) {');
    expect(componentFile).to.contain('query Get_Owner_List {');

    const expectTag = `
      <div className="narrow-layout">
        <Space direction="vertical" className="card-space">
          <Cards
            items={items}
            loading={loading}
            error={error}
            onSelect={item => {
              props.onSelect != null && props.onSelect(item);
            }}
          />
          {/* <Pagination /> - in future */}
        </Space>
      </div>`;

    expectFileContainsIgnoreSpace(componentFile, expectTag);

    [ 'First Name', 'Last Name', 'City', 'Address', 'Telephone', 'Email'].forEach(label => {
      const field = unCapitalizeFirst(label.replace(" ", ""));
      const valueWithLabel = `
      <ValueWithLabel
        key="${field}"
        label="${label}"
        value={item.${field} ?? undefined}
      />`;

      expectFileContainsIgnoreSpace(componentFile, valueWithLabel);
    });

    // check that displayName function is written for 'lookup'
    expect(fs.existsSync(displayNameFunctionFile)).to.be.true;
  });

  it('should generate lookup cards screen - ScalarsTestEntity', async () => {

    const answers = {
      componentName: 'ScalarsLookupCards',
      route: 'scalars-lookup-cards',
      query: scalarsListQuery
    };
    const componentPath = path.join(DEST_DIR, 'ScalarsLookupCards.tsx');
    // check that cleanup is completed, before test start
    expect(fs.existsSync(componentPath)).to.be.false;

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('export function ScalarsLookupCards(props: ScalarsLookupCardsProps) {');
    expect(componentFile).to.contain('query Get_Scalars_List {');
    expect((componentFile.match(/<ValueWithLabel/g) || []).length).to.eq(24);

    expectFileContainsIgnoreSpace(componentFile,
      `<ValueWithLabel key="url" label="Url" value={item.url ?? undefined} />`)
  });

});




