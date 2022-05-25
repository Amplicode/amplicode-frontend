const { runCmdSync, esc, btoa, amplicodegen } = require("../../common");

const query = `query Get_Pet_Type_List {
    petTypeList {
      id, 
      name
    }
  }`;

const answers = btoa(JSON.stringify({
  componentName: 'PetTypeLookup',
  route: 'pet-type-lookup-cards',
  shouldAddToMenu: true,
  query: esc(query),
}));

const lookupComand = `node ${amplicodegen} react-typescript:entity-lookup`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/lookup`
+ ` --dirShift ../../../`;

runCmdSync(lookupComand);
