import { User } from "oidc-client-ts";
import {resolvePath } from "react-router-dom";

export const oidcConfig = {
  authority: 'https://keycloak.demo.haulmont.com/auth/realms/amplicode',
  client_id: 'petclinic',
  realm: 'amplicode',
  redirect_uri: getRedirectUri(),
  scope: 'openid profile',
  onSigninCallback: async (user: void | User) => {
    if (user != null && user?.id_token != null) {
      await localStorage.setItem(ID_TOKEN_STORAGE_KEY, user.id_token);
      const redirectUri = (new URLSearchParams(window.location.search)).get('redirect_uri');
      if (redirectUri != null) {
        window.location.href = redirectUri;
      } else {
        console.error('redirect_uri not found');
      }
    } else {
      console.error('id_token not found');
    }
  }
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;

/**
 * After login, authority will redirect the user to:
 *
 * http://localhost:3000/auth?redirect_uri={original_uri}&state=...&session_state=...&code=...
 *
 * where `state`, `session_state` and `code` are parameters added by authority,
 * and `original_uri` is the location from where the user was redirected to authority login page
 * (including query parameters).
 *
 * The reason we don't tell the authority to redirect directly to `original_uri` is to support
 * the corner case of `original_uri` containing query parameters called `state`, `session_state` or `code`.
 *
 * The application doesn't have to actually contain the route /auth.
 */
function getRedirectUri() {
  // Ensure correct path when app is deployed on non-root path
  const authPath = resolvePath('auth').pathname;
  const returnUrl = window.location.href;
  return `${window.location.origin}${authPath}?redirect_uri=${returnUrl}`;
}