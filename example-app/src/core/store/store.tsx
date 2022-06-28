import {configureStore} from "@reduxjs/toolkit";
import { api } from "../../api/generatedApi";
import {setupListeners} from "@reduxjs/toolkit/dist/query/react";
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {PropsWithChildren} from "react";
import {loggerMiddleware} from "../middleware/loggerMiddleware";
import {serializationMiddleware} from "../middleware/serializationMiddleware";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, loggerMiddleware, serializationMiddleware),
});

setupListeners(store.dispatch);

export function ReduxProvider({children}: PropsWithChildren<any>) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



