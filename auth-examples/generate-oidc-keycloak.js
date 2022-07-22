const {btoa, runCmdSync, amplicodegen, esc} = require("../scripts/common");
const {
  petListQueryWithFilter,
  petDetailsQuery,
  petDeleteMutation,
  petUpsertMutation
} = require("../scripts/bootstrap-app/queries");
const {MANAGEMENT_DIR} = require("../scripts/bootstrap-app/config");
const rimraf = require("rimraf");

// Build the codegen

runCmdSync('npm run build --prefix ../packages/codegen');

// Clear app

rimraf.sync('example-oidc-keycloak');

// Generate empty app

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
  + ` --dest ./example-oidc-keycloak`);

// Add keycloak oidc auth

runCmdSync(`node ${amplicodegen} react-typescript:auth-oidc-keycloak`
  + ` --schema ../scripts/schema/schema.graphql`
  + ` --dest ./example-oidc-keycloak`
);

// Add a screen

const answers = btoa(JSON.stringify({
  listComponentName: 'PetTable',
  itemComponentName: 'PetTableEditor',
  route: 'pet-table',
  type: 'table',
  shouldAddToMenu: true,
  listQuery: esc(petListQueryWithFilter),
  detailsQuery: esc(petDetailsQuery),
  deleteMutation: esc(petDeleteMutation),
  upsertMutation: esc(petUpsertMutation),
  filterByArguments: [['identificationNumber']],
}));

runCmdSync(`node ${amplicodegen} react-typescript:entity-management`
  + ` --answers ${answers}`
  + ` --schema ../scripts/schema/schema.graphql`
  + ` --dest ./example-oidc-keycloak/src/app/screens/${MANAGEMENT_DIR}`
  + ` --dirShift ../../../`);

runCmdSync('npm run generate --prefix example-oidc-keycloak');
