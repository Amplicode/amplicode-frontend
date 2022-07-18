import {action, computed, makeObservable, observable} from "mobx";
import {ApolloClient, gql} from "@apollo/client";
import {AuthContextProps} from "react-oidc-context";
import {oidcConfig} from "./oidcConfig";

const ID_TOKEN_STORAGE_KEY = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;

export class SecurityStore {
  @observable userName?: string;

  constructor(
    private client: ApolloClient<unknown>,
    private auth: AuthContextProps,
  ) {
    makeObservable(this);
  }

  @computed
  get isLoggedIn() {
    return this.auth.isAuthenticated && this.isTokenAvailable;
  }

  @computed
  get isTokenAvailable() {
    return localStorage.getItem(ID_TOKEN_STORAGE_KEY) != null;
  }

  @computed
  get isInProgress() {
    return this.isLoading || this.isSigningIn || this.isSigningOut;
  }

  @computed
  get isLoading() {
    return this.auth.isLoading;
  }

  @computed
  get isSigningIn() {
    return this.auth.activeNavigator === 'signinSilent'
      || this.auth.activeNavigator === 'signinRedirect';
  }

  @computed
  get isSigningOut() {
    return this.auth.activeNavigator === 'signoutRedirect';
  }

  @computed
  get error() {
    return this.auth.error;
  }

  @action
  login = async () => {
    await this.auth.signinRedirect();
  };

  @action
  logout = async () => {
    const post_logout_redirect_uri = window.location.href;
    await this.auth.signoutRedirect({post_logout_redirect_uri});
    await this.clearSession();
  };

  @action
  async clearSession() {
    await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
  }

  @action
  checkSession(): Promise<void> {
    return this.client
      .query({
        query: gql`
          query {
            userInfo {
              username
            }
          }
        `
      })
      .then(
        action(resp => {
          const {
            userInfo: { username }
          } = resp.data;
          this.userName = username;
        })
      )
      .catch(
        action(async () => {
          await this.clearSession();
        })
      );
  }

  @action
  async saveToken(token: string) {
    await localStorage.setItem(ID_TOKEN_STORAGE_KEY, token);
  }
}
