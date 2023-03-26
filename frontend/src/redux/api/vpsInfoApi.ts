import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IVpsInfoResponse } from './types';

export const vpsInfoApi = createApi({
  reducerPath: 'vpsInfoApi',
  baseQuery: customFetchBase,
  tagTypes: ['VpsInfo'],
  endpoints: (builder) => ({  
    createVpsInfo: builder.mutation<IVpsInfoResponse, any>({
      query(payinfo) {
        return {
          url: '/vpsInfo',
          method: 'POST',
          credentials: 'include',
          body: payinfo,
        };
      },
      invalidatesTags: [{ type: 'VpsInfo', id: 'LIST' }],
      transformResponse: (result: { data: { vpsinfo: IVpsInfoResponse } }) =>
        result.data.vpsinfo,
    }),      

    getAllVpsInfo: builder.query<any, void>({
       query() {
         return {
           url: `/vpsInfo`,
           credentials: 'include',
         };
       },
       providesTags: (result) =>
         result
           ? [
               ...result.map(({ id }: any) => ({
                 type: 'VpsInfo' as const,
                 id,
               })),
               { type: 'VpsInfo', id: 'LIST' },
             ]
           : [{ type: 'VpsInfo', id: 'LIST' }],
       transformResponse: (results: { data: { vpsinfo: any} }) =>
         results?.data.vpsinfo,
    }),

    updateVpsInfo: builder.mutation<IVpsInfoResponse, { id: string; vpsinfo: any }>(
      {
        query({ id, vpsinfo }) {
          return {
            url: `/vpsInfo/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: vpsinfo,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'VpsInfo', id },
                { type: 'VpsInfo', id: 'LIST' },
              ]
            : [{ type: 'VpsInfo', id: 'LIST' }],
        transformResponse: (response: { data: { vpsinfo: IVpsInfoResponse } }) =>
          response.data.vpsinfo,
      }
    ),  
    deleteVpsInfo: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/vpsInfo/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'VpsInfo', id: 'LIST' }],
    }),
  }),
});
  
export const {
  useCreateVpsInfoMutation,
  useGetAllVpsInfoQuery,
  useUpdateVpsInfoMutation,
  useDeleteVpsInfoMutation,
} = vpsInfoApi;