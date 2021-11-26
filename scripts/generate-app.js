const { runCmdSync, btoa, amplicodegen } = require("./common");
const fs = require('fs');

const appAnswers = btoa(JSON.stringify({
  appTitle: "Jmix2 Petclinic",
  appShortName: "jmix2-petclinic",
  graphqlUri: "/graphql",
  basePath: "front",
  i18nApi: "false"
}));

const appCommand = `node ${amplicodegen} react-typescript:app`
+ ` --answers ${appAnswers}`
+ ` --schema ../scripts/schema.graphql`
+ ` --dest ../example-app`;

if (!fs.existsSync('../example-app')) {
  runCmdSync('mkdirp ../example-app');
}
runCmdSync(appCommand);
