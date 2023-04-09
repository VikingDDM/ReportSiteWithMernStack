import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { ICreatePayHistory } from '../../pages/adminPaymentStatusPage';
import { IUpdatePayHistory } from '../../components/adminPaymentStatusEditModal';
import { ICreatePayPlan } from '../../pages/userPaymentPlanPage'
import { IUpdatePayPlan } from '../../components/userPayPlanEditModal'
import { getAllPayHistory } from '../features/paymentSlice';
import { getAllPayHistories } from '../features/allPaymentSlice';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: customFetchBase,
  tagTypes: ['Payment'],
  endpoints: (builder) => ({  
     createPayPlan: builder.mutation<any, ICreatePayPlan>({
      query(payment) {

        return {
          url: '/payment/payplan',
          method: 'POST',
          credentials: 'include',
          body: payment,
        };
      },
      invalidatesTags: [{ type: 'Payment', id: 'LIST' }],
      transformResponse: (result: { data: { payment: any } }) =>
        result.data.payment,
    }),

    getPayPlan: builder.query<any, void>({
      query() {
        return {
          url: `/payment/payplan`,
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

    updatePayPlan: builder.mutation<any, { id: string; payment: IUpdatePayPlan; }>(
      {
        query({ id, payment }) {
          return {
            url: `/payment/payplan/${id}`,
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

    deletePayPlan: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/payment/payplan/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Payment', id: 'LIST' }],
    }),

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
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getAllPayHistory(data));
        } catch (error) {}
      },
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

    getMonthlyAll: builder.query<any, null>({
      query() {
        return {
          url: `/payment/monthlyall`,
          credentials: 'include',
        };
      },
      transformResponse: (results: { data: { payment: any} }) =>
        results?.data.payment,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getAllPayHistory(data));
        } catch (error) {}
      },
   }),

   getYearlyAll: builder.query<any, void>({
    query() {
      return {
        url: `/payment/yearlyall`,
        credentials: 'include',
      };
    },
    transformResponse: (results: { data: { payment: any} }) =>
      results?.data.payment,
 }),

   getAllHistory: builder.query<any, string>({
    query(date) {
      return {
        url: `/payment/allHistory/${date}`,
        credentials: 'include',
      };
    },
    transformResponse: (results: { data: { payment: any} }) =>
      results?.data.payment,
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        
      } catch (error) {}
    },
}),

    updatePayHistory: builder.mutation<any, { id: string; payment: IUpdatePayHistory; }>(
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
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            const monthData = [data[0], data[1], data[2], data[3]];
            const dateData = [data[4]];
            dispatch(getAllPayHistory(monthData));
            dispatch(getAllPayHistories(dateData));
          } catch (error) {}
        },
      }
    ),  
    deletePayment: builder.mutation<any, string | null>({
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
  useCreatePayPlanMutation,
  useCreatePayHistoryMutation,
  useGetMonthlyPayHistoryQuery,
  useGetPayPlanQuery,
  useUpdatePayHistoryMutation,
  useUpdatePayPlanMutation,
  useDeletePaymentMutation,
  useDeletePayPlanMutation,
  useGetMonthlyAllQuery,
  useGetYearlyAllQuery,
  useGetAllHistoryQuery,
} = paymentApi;