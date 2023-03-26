import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IPayInfoResponse } from './types';
import { ICreatePayInfo } from '../../pages/adminPaymentInfoPage';
import { IUpdatePayInfo } from '../../components/adminPayInfoEditModal';

export const payInfoApi = createApi({
  reducerPath: 'payInfoApi',
  baseQuery: customFetchBase,
  tagTypes: ['PayInfo'],
  endpoints: (builder) => ({  
    createPayInfo: builder.mutation<IPayInfoResponse, ICreatePayInfo>({
      query(payinfo) {
        return {
          url: '/payinfo',
          method: 'POST',
          credentials: 'include',
          body: payinfo,
        };
      },
      invalidatesTags: [{ type: 'PayInfo', id: 'LIST' }],
      transformResponse: (result: { data: { payinfo: IPayInfoResponse } }) =>
        result.data.payinfo,
    }),      

    getAllPayInfo: builder.query<any, void>({
       query() {
         return {
           url: `/payinfo`,
           credentials: 'include',
         };
       },
       providesTags: (result) =>
         result
           ? [
               ...result.map(({ id }: any) => ({
                 type: 'PayInfo' as const,
                 id,
               })),
               { type: 'PayInfo', id: 'LIST' },
             ]
           : [{ type: 'PayInfo', id: 'LIST' }],
       transformResponse: (results: { data: { payinfo: any} }) =>
         results?.data.payinfo,
    }),

    updatePayInfo: builder.mutation<IPayInfoResponse, { id: string; payinfo: IUpdatePayInfo }>(
      {
        query({ id, payinfo }) {
          return {
            url: `/payinfo/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: payinfo,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'PayInfo', id },
                { type: 'PayInfo', id: 'LIST' },
              ]
            : [{ type: 'PayInfo', id: 'LIST' }],
        transformResponse: (response: { data: { payinfo: IPayInfoResponse } }) =>
          response.data.payinfo,
      }
    ),  
    deletePayInfo: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/payinfo/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'PayInfo', id: 'LIST' }],
    }),
  }),
});
  
export const {
  useCreatePayInfoMutation,
  useGetAllPayInfoQuery,
  useUpdatePayInfoMutation,
  useDeletePayInfoMutation,
} = payInfoApi;