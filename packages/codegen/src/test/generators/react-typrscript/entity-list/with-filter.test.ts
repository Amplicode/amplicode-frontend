import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DIR, opts, SCHEMA_PATH} from "../../commons";
import {expect} from "chai";
import {ownerListQueryWithFilter, ownerDeleteMutation} from "../common/queries";

const GENERATOR_DIR = 'entity-list';

const DEST_DIR = path.join(process.cwd(), 'src', 'test', 'generated', 'generators', 'react-typescript', GENERATOR_DIR);

describe('codegen list with filter', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('with filter', async () => {
    const answers = {
      componentName: 'CardsWithFilterProperty',
      route: 'cards-with-filter-property',
      shouldAddToMenu: false,
      query: ownerListQueryWithFilter,
      mutation: ownerDeleteMutation,
      filterByArguments: [['filter', 'firstName'], ['filter', 'lastName']]
    };
    const componentPath = path.join(DEST_DIR, 'CardsWithFilterProperty.tsx');

    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('<Filters onApplyFilters={setFilterVars} />');
    expect(componentFile).to.contain('function Filters({ onApplyFilters }: FiltersProps) {');
    expect(componentFile).to.contain('type QueryVariablesType = VariablesOf<typeof OWNER_BY_NAMES_LIST>;')
  });

  it('without filter', async () => {
    const answersWithoutFilterProperty = {
      componentName: 'CardsWithoutFilterProperty',
      route: 'cards-without-filter-property',
      shouldAddToMenu: false,
      query: ownerListQueryWithFilter,
      mutation: ownerDeleteMutation,
    };
    const componentWithoutFilterPath = path.join(DEST_DIR, 'CardsWithoutFilterProperty.tsx');
    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answersWithoutFilterProperty, [SCHEMA_PATH]));
    const componentWithoutFilterFile = fs.readFileSync(componentWithoutFilterPath, 'utf-8');
    expect(componentWithoutFilterFile).to.not.contain('<Filters onApplyFilters={setFilterVars} />');
    expect(componentWithoutFilterFile).to.not.contain('function Filters({ onApplyFilters }: FiltersProps) {');

    const answersWithNullFilterProperty = {
      componentName: 'CardsWithNullFilterProperty',
      route: 'cards-with-null-filter-property',
      shouldAddToMenu: false,
      query: ownerListQueryWithFilter,
      mutation: ownerDeleteMutation,
      filterByArguments: null
    };
    const componentWithNullFilterPath = path.join(DEST_DIR, 'CardsWithNullFilterProperty.tsx');
    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answersWithNullFilterProperty, [SCHEMA_PATH]));
    const componentWithNullFilterFile = fs.readFileSync(componentWithNullFilterPath, 'utf-8');
    expect(componentWithNullFilterFile).to.not.contain('<Filters onApplyFilters={setFilterVars} />');
    expect(componentWithNullFilterFile).to.not.contain('function Filters({ onApplyFilters }: FiltersProps) {');

    const answersWithEmptyArrayFilterProperty = {
      componentName: 'CardsWithEmptyArrayFilterProperty',
      route: 'cards-with-empty-array-filter-property',
      shouldAddToMenu: false,
      query: ownerListQueryWithFilter,
      mutation: ownerDeleteMutation,
      filterByArguments: []
    };
    const componentWithEmptyArrayFilterPath = path.join(DEST_DIR, 'CardsWithEmptyArrayFilterProperty.tsx');
    await generate(path.join(GENERATORS_DIR, 'react-typescript', GENERATOR_DIR), opts(DEST_DIR, answersWithEmptyArrayFilterProperty, [SCHEMA_PATH]));
    const componentWithEmptyArrayFilterFile = fs.readFileSync(componentWithEmptyArrayFilterPath, 'utf-8');
    expect(componentWithEmptyArrayFilterFile).to.not.contain('<Filters onApplyFilters={setFilterVars} />');
    expect(componentWithEmptyArrayFilterFile).to.not.contain('function Filters({ onApplyFilters }: FiltersProps) {');
  });
});
