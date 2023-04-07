import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IReportResponse } from './types';
import { ICreateReportWithUser } from '../../pages/userDailyReportPage';
import { IUpdateReport } from '../../components/userDailyReportEditModal';


export const reportApi = createApi({
    reducerPath: 'reportApi',
    baseQuery: customFetchBase,
    tagTypes: ['Reports'],
    endpoints: (builder) => ({

      createReport: builder.mutation<IReportResponse, ICreateReportWithUser>({
        query(report) {
          return {
            url: '/reports',
            method: 'POST',
            credentials: 'include',
            body: report,
          };
        },
        invalidatesTags: [{ type: 'Reports', id: 'LIST' }],
        transformResponse: (result: { data: { report: IReportResponse } }) =>
          result.data.report,
      }),

      getUserDailyReport: builder.query<any, void>({
        query() {
          return {
            url: `/reports/userdailyreports`,
            credentials: 'include',
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }: any) => ({
                  type: 'Reports' as const,
                  id,
                })),
                { type: 'Reports', id: 'LIST' },
              ]
            : [{ type: 'Reports', id: 'LIST' }],
        transformResponse: (results: { data: { reportsWithUser: any} }) =>
          results?.data.reportsWithUser,
      }),

      getUserWeeklyReports: builder.query<any, void>({
        query() {
          return {
            url: `/reports/userweeklyreports`,
            credentials: 'include',
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id } : any) => ({
                  type: 'Reports' as const,
                  id,
                })),
                { type: 'Reports', id: 'LIST' },
              ]
            : [{ type: 'Reports', id: 'LIST' }],
        transformResponse: (results: { data: { reportsWithUser: any } }) =>
          results.data.reportsWithUser,
      }),

      getDailyReportStatus: builder.query<any, void>({
        query() {
          return {
            url: `/reports/dailyreportstatus`,
            credentials: 'include',
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id } : any) => ({
                  type: 'Reports' as const,
                  id,
                })),
                { type: 'Reports', id: 'LIST' },
              ]
            : [{ type: 'Reports', id: 'LIST' }],
        transformResponse: (results: { data: { reportsWithUsers: any } }) =>
          results.data.reportsWithUsers,
      }),

      getReportStatus: builder.query<any, string>({
        query(date) {
          return {
            url: `/reports/reportstatus/${date}`,
            credentials: 'include',
          };
        },
        
        transformResponse: (results: { data: { reportStatusWithUsers: any } }) =>
          results.data.reportStatusWithUsers,
      }),


      updateReport: builder.mutation<IReportResponse, { id: string; report: IUpdateReport }>(
        {
          query({ id, report }) {
            return {
              url: `/reports/${id}`,
              method: 'PATCH',
              credentials: 'include',
              body: report,
            };
          },
          invalidatesTags: (result, error, { id }) =>
            result
              ? [
                  { type: 'Reports', id },
                  { type: 'Reports', id: 'LIST' },
                ]
              : [{ type: 'Reports', id: 'LIST' }],
          transformResponse: (response: { data: { report: IReportResponse } }) =>
            response.data.report,
        }
      ),

      deleteReport: builder.mutation<any, string>({
        query(id) {
          return {
            url: `/reports/${id}`,
            method: 'Delete',
            credentials: 'include',
          };
        },
        invalidatesTags: [{ type: 'Reports', id: 'LIST' }],
      }),
    }),
  });
  
  export const {
    useCreateReportMutation,
    useDeleteReportMutation,
    useUpdateReportMutation,
    useGetUserWeeklyReportsQuery,
    useGetUserDailyReportQuery,
    useGetDailyReportStatusQuery,
    useGetReportStatusQuery,
  } = reportApi;