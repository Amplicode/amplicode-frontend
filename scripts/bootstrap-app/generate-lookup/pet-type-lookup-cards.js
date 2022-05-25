const {LOOKUP_SCREENS_DIR} = require("../config");
const {petTypeListQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  componentName: 'PetTypeLookupCards',
  route: 'pet-type-lookup-cards',
  shouldAddToMenu: true,
  query: esc(petTypeListQuery),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-lookup`
  + ` --answers ${answers}`
  + ` --schema ./schema.graphql`
  + ` --dest ../example-app/src/app/screens/${LOOKUP_SCREENS_DIR}`
  + ` --dirShift ../../../`);
