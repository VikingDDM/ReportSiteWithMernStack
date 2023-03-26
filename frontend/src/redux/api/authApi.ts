import { createApi } from '@reduxjs/toolkit/query/react';
import { SigninInput } from '../../pages/signinPage';
import { SignupInput } from '../../pages/signupPage';
import customFetchBase from './customFetchBase';
import { GenericResponse } from './types';
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    signupUser: builder.mutation<GenericResponse, SignupInput>({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        };
      },
    }),
    signinUser: builder.mutation<{ access_token: string; status: string },SigninInput>({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    signoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          credentials: 'include',
        };
      },
    })
  }),
});

export const {
    useSigninUserMutation,
    useSignupUserMutation,
    useSignoutUserMutation
  } = authApi;