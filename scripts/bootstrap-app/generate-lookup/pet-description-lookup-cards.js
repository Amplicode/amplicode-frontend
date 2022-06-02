const {LOOKUP_SCREENS_DIR} = require("../config");
const {petDescriptionListQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  componentName: 'PetDescriptionLookupCards',
  route: 'pet-description-lookup-cards',
  shouldAddToMenu: true,
  query: esc(petDescriptionListQuery),
  idField: 'identifier'
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-lookup`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${LOOKUP_SCREENS_DIR}`
  + ` --dirShift ../../../`);
