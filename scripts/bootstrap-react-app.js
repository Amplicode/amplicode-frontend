const {runCmdSync} = require("./common");
const rimraf = require('rimraf');

runCmdSync('lerna run --scope @amplicode/codegen prepublishOnly')

rimraf.sync('example-app');

runCmdSync('node generate-app.js', './scripts');
runCmdSync('node generate-management/owner-management-cards.js', './scripts');
runCmdSync('node generate-management/owner-management-list.js', './scripts');
runCmdSync('node generate-management/owner-management-table.js', './scripts');
runCmdSync('node generate-management/pet-management-cards.js', './scripts');
runCmdSync('node generate-management/pet-management-list.js', './scripts');
runCmdSync('node generate-management/pet-management-table.js', './scripts');

runCmdSync('node generate-readonly/owner-cards-readonly.js', './scripts');
runCmdSync('node generate-readonly/owner-table-readonly.js', './scripts');

runCmdSync('node generate-standalone/owner-cards-standalone.js', './scripts');
runCmdSync('node generate-standalone/owner-table-standalone.js', './scripts');

runCmdSync('lerna run prepublishOnly');
runCmdSync(`lerna exec --scope '{@amplicode/react-core,@amplicode/react-antd}' "npm pack"`);

runCmdSync('cd example-app && npm i');
runCmdSync('cd example-app && npm run generate');
installLocalPackage('react-core');
installLocalPackage('react-antd');

function installLocalPackage(packageName) {
  const {version} = require(`../packages/${packageName}/package.json`);
  runCmdSync(`npm i --prefix example-app packages/${packageName}/amplicode-${packageName}-${version}.tgz`);
}
