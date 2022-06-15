const { runCmdSync, amplicodegen } = require("../scripts/common");

runCmdSync(`node ${amplicodegen} react-typescript:update-schema` +
  ' --dest demo-app' +
  ' --schema ../scripts/schema/schema.graphql ../scripts/schema/defaultaddon.graphqls');