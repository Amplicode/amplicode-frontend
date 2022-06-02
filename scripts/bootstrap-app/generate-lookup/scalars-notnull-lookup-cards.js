const {LOOKUP_SCREENS_DIR} = require("../config");
const {notNullScalarsListQuery} = require("../queries");
const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  componentName: 'ScalarsNotNullLookupCards',
  route: 'scalars-notnull-lookup-cards',
  shouldAddToMenu: true,
  query: esc(notNullScalarsListQuery),
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-lookup`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${LOOKUP_SCREENS_DIR}`
  + ` --dirShift ../../../`);
