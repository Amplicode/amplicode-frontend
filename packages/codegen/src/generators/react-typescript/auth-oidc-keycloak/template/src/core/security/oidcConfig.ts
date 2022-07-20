export const oidcConfig = {
  authority: 'https://keycloak.demo.haulmont.com/auth/realms/amplicode',
  client_id: 'petclinic',
  realm: 'amplicode',
  scope: 'openid profile',
};

export const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;