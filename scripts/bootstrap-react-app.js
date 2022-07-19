const {runCmdSync} = require("./common");
const rimraf = require('rimraf');
const argv = require('minimist')(process.argv.slice(2));

runCmdSync('lerna run --scope @amplicode/codegen prepublishOnly')

rimraf.sync('example-app');

runCmdSync(`node bootstrap-app/generate-app.js --menuType=${argv.menuType}`, './scripts');
gen('management/owner-management-cards.js');
gen('management/owner-management-list.js');
gen('management/owner-management-table.js');
gen('management/owner-management-table-with-multiselect.js');
gen('management/owner-management-cards-with-filter-sort-page.js');
gen('management/owner-management-list-with-filter-sort-page.js');
gen('management/owner-management-table-with-filter-sort-page.js');
gen('management/pet-management-cards.js');
gen('management/pet-management-list.js');
gen('management/pet-management-table.js');
gen('management/scalars-management-list.js');
gen('management/scalars-management-table.js');
gen('management/scalars-notnull-management-cards.js');
gen('management/pet-disease-management-list.js');
gen('management/pet-disease-management-cards.js');
gen('management/pet-disease-management-table.js');
gen('management/pet-type-management-table.js');
gen('management/visit-with-filter.js');

gen('readonly-collection-with-details/owner-cards-readonly.js');
gen('readonly-collection-with-details/owner-table-readonly.js');
gen('readonly-collection-with-details/owner-list-readonly.js');
gen('readonly-collection-with-details/pet-cards-readonly.js');
gen('readonly-collection-with-details/pet-table-readonly.js');
gen('readonly-collection-with-details/pet-list-readonly.js');
gen('readonly-collection-with-details/scalars-list-readonly.js');
gen('readonly-collection-with-details/pet-disease-list-readonly.js');

gen('standalone-collection/owner-cards-standalone.js');
gen('standalone-collection/owner-table-standalone.js');
gen('standalone-collection/owner-list-standalone.js');
gen('standalone-collection/pet-disease-list-standalone.js');
gen('standalone-collection/scalars-cards-standalone.js');

gen('standalone-editor/owner-editor-standalone.js');
gen('standalone-editor/pet-disease-editor-standalone.js');
gen('standalone-editor/scalars-editor-standalone.js');

gen('standalone-details/owner-details-standalone.js');
gen('standalone-details/pet-details-standalone.js');
gen('standalone-details/scalars-details-standalone.js');

gen('lookup/owner-lookup-cards.js');
gen('lookup/pet-lookup-cards.js');
gen('lookup/pet-type-lookup-cards.js');
gen('lookup/pet-disease-lookup-cards.js');
gen('lookup/scalars-lookup-cards.js');
gen('lookup/scalars-notnull-lookup-cards.js');
gen('lookup/pet-description-lookup-cards.js');

gen('blank/blank-component.js');

runCmdSync('lerna run prepublishOnly');
runCmdSync(`lerna exec --scope @amplicode/react "npm pack"`);

installLocalPackage('react');
runCmdSync('cd example-app && npm i');
runCmdSync('cd example-app && npm run generate');

function installLocalPackage(packageName) {
  const {version} = require(`../packages/${packageName}/package.json`);
  runCmdSync(`npm i --prefix example-app packages/${packageName}/amplicode-${packageName}-${version}.tgz`);
}

function gen(path) {
  runCmdSync(`node bootstrap-app/${path}`, './scripts');
}
