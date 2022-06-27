import fs from "fs";
import path from "path";
import {cleanup, generate, GENERATORS_DEST_DIR, GENERATORS_DIR, opts, SCHEMA_PATH} from "../common";
import {expect} from "chai";
import {ownerListQueryWithFilter, ownerDeleteMutation} from "../queries";

const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'entity-list');
const GENERATOR_DIR = path.join(GENERATORS_DIR, 'entity-list');

describe('codegen filter in standalone cards', () => {

  beforeEach(async () => await cleanup(DEST_DIR));

  it('standalone cards with filter', async () => {
    const answers = {
      componentName: 'CardsWithFilterProperty',
      route: 'cards-with-filter-property',
      shouldAddToMenu: false,
      query: ownerListQueryWithFilter,
      mutation: ownerDeleteMutation,
      filterByArguments: [['filter', 'firstName'], ['filter', 'lastName']]
    };
    const componentPath = path.join(DEST_DIR, 'CardsWithFilterProperty.tsx');

    await generate(GENERATOR_DIR, opts(DEST_DIR, answers, [SCHEMA_PATH]));

    const componentFile = fs.readFileSync(componentPath, 'utf-8');
    expect(componentFile).to.contain('<Filters onApplyFilters={onApplyFilters} />');
    expect(componentFile).to.contain('function Filters({ onApplyFilters }: FiltersProps) {');
    expect(componentFile).to.contain('type QueryVariablesType = VariablesOf<typeof OWNER_BY_NAMES_LIST>;')
  });

  it('standalone cards without filter', async () => {
    const answersWithoutFilterProperty = {
      componentName: 'CardsWithoutFilterProperty',
      route: 'cards-without-filter-property',
      shouldAddToMenu: false,
      query: ownerListQueryWithFilter,
      mutation: ownerDeleteMutation,
    };
    const componentWithoutFilterPath = path.join(DEST_DIR, 'CardsWithoutFilterProperty.tsx');
    await generate(GENERATOR_DIR, opts(DEST_DIR, answersWithoutFilterProperty, [SCHEMA_PATH]));
    const componentWithoutFilterFile = fs.readFileSync(componentWithoutFilterPath, 'utf-8');
    expect(componentWithoutFilterFile).to.not.contain('<Filters onApplyFilters={onApplyFilters} />');
    expect(componentWithoutFilterFile).to.not.contain('function Filters({ onApplyFilters }: FiltersProps) {');
  });

  it('standalone cards with empty filter', async () => {
    const answersWithNullFilterProperty = {
      componentName: 'CardsWithNullFilterProperty',
      route: 'cards-with-null-filter-property',
      shouldAddToMenu: false,
      query: ownerListQueryWithFilter,
      mutation: ownerDeleteMutation,
      filterByArguments: null
    };
    const componentWithNullFilterPath = path.join(DEST_DIR, 'CardsWithNullFilterProperty.tsx');
    await generate(GENERATOR_DIR, opts(DEST_DIR, answersWithNullFilterProperty, [SCHEMA_PATH]));
    const componentWithNullFilterFile = fs.readFileSync(componentWithNullFilterPath, 'utf-8');
    expect(componentWithNullFilterFile).to.not.contain('<Filters onApplyFilters={onApplyFilters} />');
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
    await generate(GENERATOR_DIR, opts(DEST_DIR, answersWithEmptyArrayFilterProperty, [SCHEMA_PATH]));
    const componentWithEmptyArrayFilterFile = fs.readFileSync(componentWithEmptyArrayFilterPath, 'utf-8');
    expect(componentWithEmptyArrayFilterFile).to.not.contain('<Filters onApplyFilters={onApplyFilters} />');
    expect(componentWithEmptyArrayFilterFile).to.not.contain('function Filters({ onApplyFilters }: FiltersProps) {');
  });
});
