import React, {useEffect} from "react";
import "./App.css";
import { Login } from "./login/Login";
import { observer } from "mobx-react";
import { AppMain } from "./main/Main";
import { useSecurityStore } from "../core/security/security-context";
import {useAppDispatch, useAppSelector} from "../core/store/store";
import {selectIsLoggedIn, setLoggedIn, setLoggedOut, setUserName} from "../core/security/securitySlice";
import {useLazyUserInfoQuery, useUserInfoQuery} from "../api/generatedGraphQLApi";
import {Spin} from "antd";

export const App = observer(() => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const [loadUserInfo] = useLazyUserInfoQuery();

  useEffect(() => {
    async function getUserInfo() {
      if (isLoggedIn) {
        const {data} = await loadUserInfo();
        const {username} = data?.userInfo ?? {};
        console.log('username', username);
        if (username == null) {
          dispatch(setLoggedOut());
          return;
        }
        dispatch(setUserName(username));
      }
    }
    getUserInfo();
  }, [dispatch, isLoggedIn, loadUserInfo]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return <AppMain />;
});

export default App;
