import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {LOGIN_URI, LOGOUT_URI} from "../config";

export const restApi = createApi({
  reducerPath: 'restApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: LOGIN_URI,
        method: 'POST',
        body: credentials,
        headers: { "content-type": "application/x-www-form-urlencoded" }
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_URI,
        method: 'POST'
      })
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
} = restApi;