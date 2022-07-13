export const oidcConfig = {
  authority: 'https://keycloak.demo.haulmont.com/auth/realms/amplicode',
  client_id: 'petclinic',
  realm: 'amplicode',
  redirect_uri: 'http://localhost:3000',
  scope: 'openid profile',
  onSigninCallback: () => {
    console.log('*************');
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};