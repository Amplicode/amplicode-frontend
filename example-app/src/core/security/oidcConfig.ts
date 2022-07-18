import {resolvePath } from "react-router-dom";

export const oidcConfig = {
  authority: 'https://keycloak.demo.haulmont.com/auth/realms/amplicode',
  client_id: 'petclinic',
  realm: 'amplicode',
  scope: 'openid profile',
};

