import {action, makeObservable, observable} from "mobx";
import {ApolloClient, gql} from "@apollo/client";
import {AuthContextProps} from "react-oidc-context";
import {ID_TOKEN_STORAGE_KEY} from "./oidcConfig";

export class SecurityStore {
  @observable userName: string | null = null;

  constructor(
    private client: ApolloClient<unknown>,
    private auth: AuthContextProps,
  ) {
    makeObservable(this);
  }

  @action
  login = async () => {
    await this.auth.signinRedirect();
  };

  @action
  logout = async () => {
    const post_logout_redirect_uri = window.location.href;
    await localStorage.removeItem(ID_TOKEN_STORAGE_KEY);
    await this.auth.signoutRedirect({post_logout_redirect_uri});
  };

  @action
  checkSession = async (): Promise<void> => {
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
          await this.logout();
        })
      );
  };
}
