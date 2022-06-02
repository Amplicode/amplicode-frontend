const { runCmdSync, btoa, amplicodegen } = require("../common");
const fs = require('fs');

const appAnswers = btoa(JSON.stringify({
  appTitle: "Jmix2 Petclinic",
  appShortName: "jmix2-petclinic",
  graphqlUri: "/graphql",
  basePath: "front"
}));

if (!fs.existsSync('../example-app')) {
  runCmdSync('mkdirp ../example-app');
}
runCmdSync(`node ${amplicodegen} react-typescript:app`
  + ` --answers ${appAnswers}`
  + ` --schema ../scripts/schema/schema.graphql ../scripts/schema/defaultaddon.graphqls`
  + ` --dest ../example-app`);
