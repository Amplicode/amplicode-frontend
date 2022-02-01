export const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI ?? "/graphql";
export const LOGIN_URI = process.env.REACT_APP_LOGIN_URI ?? "/login";
export const LOGOUT_URI = process.env.REACT_APP_LOGOUT_URI ?? "/logout";
export const REQUEST_SAME_ORIGIN = process.env.REACT_APP_REQUEST_SAME_ORIGIN === "true";
export const DEV_LOGIN = process.env.REACT_APP_DEV_LOGIN ?? "admin";
export const DEV_PASSWORD = process.env.REACT_APP_DEV_PASSWORD ?? "admin";
