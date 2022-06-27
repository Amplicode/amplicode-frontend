const {runCmdSync} = require("./common");
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

runCmdSync('lerna run --scope @amplicode/codegen prepublishOnly')

rimraf.sync('example-app');

runCmdSync(`node bootstrap-app/generate-app.js --menuType=${argv.menuType}`, './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-list.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-cards-with-filter.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/owner-management-table-with-multiselect.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-management-list.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/scalars-management-list.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/scalars-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/scalars-notnull-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-disease-management-list.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-disease-management-cards.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-disease-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/pet-type-management-table.js', './scripts');
runCmdSync('node  bootstrap-app/generate-management/visit-with-filter.js', './scripts');

runCmdSync('node  bootstrap-app/generate-readonly-collection/owner-cards-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/owner-table-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/owner-list-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-cards-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-table-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-list-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/scalars-list-readonly.js', './scripts');
runCmdSync('node  bootstrap-app/generate-readonly-collection/pet-disease-list-readonly.js', './scripts');

runCmdSync('node  bootstrap-app/generate-standalone-collection/owner-cards-standalone.js', './scripts');
runCmdSync('node  bootstrap-app/generate-standalone-collection/owner-table-standalone.js', './scripts');
runCmdSync('node  bootstrap-app/generate-standalone-collection/owner-list-standalone.js', './scripts');
runCmdSync('node  bootstrap-app/generate-standalone-collection/pet-disease-list-standalone.js', './scripts');
runCmdSync('node  bootstrap-app/generate-standalone-collection/scalars-cards-standalone.js', './scripts');

runCmdSync('node bootstrap-app/generate-standalone-editor/owner-editor-standalone.js', './scripts');
runCmdSync('node bootstrap-app/generate-standalone-editor/pet-disease-editor-standalone.js', './scripts');
runCmdSync('node bootstrap-app/generate-standalone-editor/scalars-editor-standalone.js', './scripts');

runCmdSync('node bootstrap-app/generate-standalone-details/owner-details-standalone.js', './scripts');
runCmdSync('node bootstrap-app/generate-standalone-details/pet-details-standalone.js', './scripts');
runCmdSync('node bootstrap-app/generate-standalone-details/scalars-details-standalone.js', './scripts');

runCmdSync('node bootstrap-app/generate-lookup/owner-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/pet-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/pet-type-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/pet-disease-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/scalars-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/scalars-notnull-lookup-cards.js', './scripts');
runCmdSync('node bootstrap-app/generate-lookup/pet-description-lookup-cards.js', './scripts');

runCmdSync('node bootstrap-app/generate-blank/blank-component.js', './scripts');

runCmdSync('lerna run prepublishOnly');
runCmdSync(`lerna exec --scope @amplicode/react "npm pack"`);

installLocalPackage('react');
runCmdSync('cd example-app && npm i');
runCmdSync('cd example-app && npm run generate');

function installLocalPackage(packageName) {
  const {version} = require(`../packages/${packageName}/package.json`);
  runCmdSync(`npm i --prefix example-app packages/${packageName}/amplicode-${packageName}-${version}.tgz`);
}
