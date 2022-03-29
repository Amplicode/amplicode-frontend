const { runCmdSync, esc, btoa, amplicodegen } = require("../common");

const ownerListQuery = `query Get_Owner_List {
    ownerList {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
  }`;

const answers = btoa(JSON.stringify({
  componentName: 'OwnerLookup',
  route: 'owner-lookup-cards',
  shouldAddToMenu: true,
  query: esc(ownerListQuery),
}));

const lookupComand = `node ${amplicodegen} react-typescript:entity-lookup`
+ ` --answers ${answers}`
+ ` --schema ./schema.graphql`
+ ` --dest ../example-app/src/app/screens/lookup`
+ ` --dirShift ../../../`;

runCmdSync(lookupComand);
