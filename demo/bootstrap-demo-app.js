const { runCmdSync, btoa, amplicodegen } = require("../scripts/common");

runCmdSync('lerna run --scope @amplicode/codegen prepublishOnly', '..');

const appAnswers = btoa(JSON.stringify({
  appTitle: "Jmix2 Petclinic",
  appShortName: "jmix2-petclinic",
  graphqlUri: "/graphql",
  basePath: "front",
  menuType: 'vertical',
}));

runCmdSync(`node ${amplicodegen} react-typescript:app`
  + ` --answers ${appAnswers}`
  + ` --schema ../scripts/schema/schema.graphql`
  + ` --dest ./demo-app`);

runCmdSync('npm i', './demo-app');