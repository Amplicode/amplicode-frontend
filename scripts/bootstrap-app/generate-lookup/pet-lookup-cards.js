const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const petListQuery = `query Get_Pet_List {
    petList {
      id
      identificationNumber
      birthDate
      type {
        id
        name
      }
      owner {
        id
        firstName
        lastName
      }
    }
  }`;

const answers = btoa(JSON.stringify({
  componentName: 'PetLookup',
  route: 'pet-lookup-cards',
  shouldAddToMenu: true,
  query: esc(petListQuery),
}));

const lookupComand = `node ${amplicodegen} react-typescript:entity-lookup`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/lookup`
+ ` --dirShift ../../../`;

runCmdSync(lookupComand);
