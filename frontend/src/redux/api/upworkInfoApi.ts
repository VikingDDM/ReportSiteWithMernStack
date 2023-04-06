import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IUpworkInfoResponse } from './types';
import { ICreateUpworkInfo } from '../../pages/adminUpworkInfoPage';
import { IUpdateUpworkInfo } from '../../components/adminUpworkInfoEditModal';

export const upworkInfoApi = createApi({
  reducerPath: 'upworkInfoApi',
  baseQuery: customFetchBase,
  tagTypes: ['UpworkInfo'],
  endpoints: (builder) => ({  
    createUpworkInfo: builder.mutation<IUpworkInfoResponse, ICreateUpworkInfo>({
      query(upworkinfo) {
        return {
          url: '/upworkInfo',
          method: 'POST',
          credentials: 'include',
          body: upworkinfo,
        };
      },
      invalidatesTags: [{ type: 'UpworkInfo', id: 'LIST' }],
      transformResponse: (result: { data: { upworkinfo: IUpworkInfoResponse } }) =>
        result.data.upworkinfo,
    }),      

    getAllUpworkInfo: builder.query<any, void>({
       query() {
         return {
           url: `/upworkInfo`,
           credentials: 'include',
         };
       },
       providesTags: (result) =>
         result
           ? [
               ...result.map(({ id }: any) => ({
                 type: 'UpworkInfo' as const,
                 id,
               })),
               { type: 'UpworkInfo', id: 'LIST' },
             ]
           : [{ type: 'UpworkInfo', id: 'LIST' }],
       transformResponse: (results: { data: { upworkinfo: any} }) =>
         results?.data.upworkinfo,
    }),

    updateUpworkInfo: builder.mutation<IUpworkInfoResponse, { id: string; upworkInfo: IUpdateUpworkInfo }>(
      {
        query({ id, upworkInfo }) {
          return {
            url: `/upworkInfo/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: upworkInfo,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'UpworkInfo', id },
                { type: 'UpworkInfo', id: 'LIST' },
              ]
            : [{ type: 'UpworkInfo', id: 'LIST' }],
        transformResponse: (response: { data: { upworkinfo: IUpworkInfoResponse } }) =>
          response.data.upworkinfo,
      }
    ),  
    deleteUpworkInfo: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/upworkInfo/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'UpworkInfo', id: 'LIST' }],
    }),
  }),
});
  
export const {
  useCreateUpworkInfoMutation,
  useGetAllUpworkInfoQuery,
  useUpdateUpworkInfoMutation,
  useDeleteUpworkInfoMutation,
} = upworkInfoApi;