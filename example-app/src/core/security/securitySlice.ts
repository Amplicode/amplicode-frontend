import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/store";

type SecurityState = {
  userName: string | null;
  isLoggedIn: boolean;
}

const securitySlice = createSlice({
  name: 'security',
  initialState: {
    userName: null,
    isLoggedIn: true
  } as SecurityState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userName = null;
    }
  }
});

export const { setLoggedIn, setLoggedOut, setUserName } = securitySlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.security.isLoggedIn;
export const selectUserName = (state: RootState) => state.security.userName;

export const securityReducer = securitySlice.reducer;
