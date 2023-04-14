import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import customFetchBase from "./customFetchBase";
import { IUser } from "./types";
import {IUpdateRole} from "../../components/adminRoleEditModal"
import {IUpdatePWD} from "../../components/adminPasswordEditModal"
import { IUpdateTimezoneInfo } from "../../components/adminTimezoneEditModal";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),

    updateRole: builder.mutation<IUser, { id: string; roleInfo: IUpdateRole }>(
      {
        query({ id, roleInfo }) {
          return {
            url: `/users/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: roleInfo,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'User', id },
                { type: 'User', id: 'LIST' },
              ]
            : [{ type: 'User', id: 'LIST' }],
        transformResponse: (response: { data: { user: IUser } }) =>
          response.data.user,
      }
    ),  

    updatePWD: builder.mutation<IUser, { id: string; pswInfo: IUpdatePWD }>(
      {
        query({ id, pswInfo }) {
          return {
            url: `/users/pwd/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: pswInfo,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'User', id },
                { type: 'User', id: 'LIST' },
              ]
            : [{ type: 'User', id: 'LIST' }],
        transformResponse: (response: { data: { user: IUser } }) =>
          response.data.user,
      }
    ),  
    updateTimezone: builder.mutation<any, { id: string; timezoneInfo: IUpdateTimezoneInfo }>(
      {
        query({ id, timezoneInfo }) {
          return {
            url: `/users/timezone/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: timezoneInfo,
          };
        },
        
        transformResponse: (response: { data: { user: any } }) =>
          response.data.user,
      }
    ),  
    getAllUsers: builder.query<any, void>({
      query() {
        return {
          url: "users/all",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: any } }) =>
        result.data.user
    }),
    getServerTimeZone: builder.query<any, void>({
      query() {
        return {
          url: "users/timezone",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: any } }) =>
        result.data.user
    }),
    deleteUser: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateRoleMutation,
  useUpdatePWDMutation,
  useDeleteUserMutation,
  useGetServerTimeZoneQuery,
  useUpdateTimezoneMutation,
} = userApi;
