const {BLANK_DIR} = require("../config");
const { runCmdSync, btoa, amplicodegen } = require("../../common");

const answers = btoa(JSON.stringify({
  componentName: 'BlankComponent',
  route: 'blank-component',
  shouldAddToMenu: true,
}));

runCmdSync(`node ${amplicodegen} react-typescript:blank`
  + ` --answers ${answers}`
  + ` --schema ./schema/schema.graphql ./schema/defaultaddon.graphqls`
  + ` --dest ../example-app/src/app/screens/${BLANK_DIR}`
  + ` --dirShift ../../../`);
