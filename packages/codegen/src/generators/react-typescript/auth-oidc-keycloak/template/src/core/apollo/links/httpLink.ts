import {createHttpLink} from "@apollo/client";
import {GRAPHQL_URI, REQUEST_SAME_ORIGIN} from "../../../config";

export const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
  // credentials: REQUEST_SAME_ORIGIN ? "same-origin" : "include"
});