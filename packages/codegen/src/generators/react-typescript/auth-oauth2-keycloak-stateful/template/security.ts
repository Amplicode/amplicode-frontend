import { action, makeObservable, observable } from "mobx";
import axios from "axios";
import { LOGOUT_URI } from "../../config";
import { ApolloClient, gql } from "@apollo/client";

export class SecurityStore {
  @observable isLoggedIn: boolean = true;
  @observable userName: string | null = null;

  constructor(private client: ApolloClient<unknown>) {
    makeObservable(this);
  }

  @action
  logout = async () => {
    const response = await axios(LOGOUT_URI, {
      method: "POST"
    });

    this.isLoggedIn = false;

    return response;
  };

  @action
  initialize(): Promise<void> {
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
        this.isLoggedIn = true;
      })
    )
    .catch(
      action(() => {
        this.isLoggedIn = false;
      })
    );
  }
}
