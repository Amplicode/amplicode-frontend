import { User } from "oidc-client-ts";

export const oidcConfig = {
  authority: 'https://keycloak.demo.haulmont.com/auth/realms/amplicode',
  client_id: 'petclinic',
  realm: 'amplicode',
  redirect_uri: window.location.href,
  scope: 'openid profile',
  onSigninCallback: async (user: void | User) => {
    console.log('user', user);
    if (user?.id_token != null) {
      await localStorage.setItem(ID_TOKEN_STORAGE_KEY, user.id_token);
    } else {
      console.error('id_token not found');
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;