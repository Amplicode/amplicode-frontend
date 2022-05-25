const {runCmdSync} = require("./common");
const rimraf = require('rimraf');

runCmdSync('lerna run --scope @amplicode/codegen prepublishOnly')

rimraf.sync('example-app');

runCmdSync('node bootstrap-app/generate-app.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-list.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-cards-with-filter.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-management-list.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/test-scalars-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/test-scalars-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/test-notnull-scalars-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-disease-management-list.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-disease-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-disease-management-table.js', './scripts');

runCmdSync('node  bootstrap-app/generate-readonly-collection/owner-cards-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/owner-table-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/owner-list-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-cards-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-table-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-list-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/test-scalars-list-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-disease-list-readonly.js', './scripts');

runCmdSync('node  bootstrap-app/generate-standalone-collection/owner-cards-standalone.js', './scripts');
runCmdSync('node  bootstrap-app/generate-standalone-collection/owner-table-standalone.js', './scripts');
runCmdSync('node  bootstrap-app/generate-standalone-collection/owner-list-standalone.js', './scripts');
runCmdSync('node  bootstrap-app/generate-standalone-collection/pet-disease-list-standalone.js', './scripts');

runCmdSync('node bootstrap-app/generate-standalone-editor/owner-editor-standalone.js', './scripts');
runCmdSync('node bootstrap-app/generate-standalone-editor/pet-disease-editor-standalone.js', './scripts');

runCmdSync('node bootstrap-app/generate-lookup/owner-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/pet-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/pet-type-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/pet-disease-lookup-cards.js', './scripts');

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
