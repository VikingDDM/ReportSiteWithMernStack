import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { ICreatePayHistory } from '../../pages/adminPaymentStatusPage';
import { IUpdatePayHistory } from '../../components/adminPaymentStatusEditModal';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: customFetchBase,
  tagTypes: ['Payment'],
  endpoints: (builder) => ({  
    createPayHistory: builder.mutation<any, ICreatePayHistory>({
      query(payment) {
        return {
          url: '/payment/payhistory',
          method: 'POST',
          credentials: 'include',
          body: payment,
        };
      },
      invalidatesTags: [{ type: 'Payment', id: 'LIST' }],
      transformResponse: (result: { data: { payment: any } }) =>
        result.data.payment,
    }),      

    getMonthlyPayHistory: builder.query<any, void>({
       query() {
         return {
           url: `/payment/monthlypay`,
           credentials: 'include',
         };
       },
       providesTags: (result) =>
         result
           ? [
               ...result.map(({ id }: any) => ({
                 type: 'Payment' as const,
                 id,
               })),
               { type: 'Payment', id: 'LIST' },
             ]
           : [{ type: 'Payment', id: 'LIST' }],
       transformResponse: (results: { data: { payment: any} }) =>
         results?.data.payment,
    }),

    updatePayHistory: builder.mutation<any, { id: string; payment: IUpdatePayHistory }>(
      {
        query({ id, payment }) {
          return {
            url: `/payment/payhistory/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: payment,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'Payment', id },
                { type: 'Payment', id: 'LIST' },
              ]
            : [{ type: 'Payment', id: 'LIST' }],
        transformResponse: (response: { data: { payment: any } }) =>
          response.data.payment,
      }
    ),  
    deletePayment: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/payment/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Payment', id: 'LIST' }],
    }),
  }),
});
  
export const {
  useCreatePayHistoryMutation,
  useGetMonthlyPayHistoryQuery,
  useUpdatePayHistoryMutation,
  useDeletePaymentMutation,
} = paymentApi;