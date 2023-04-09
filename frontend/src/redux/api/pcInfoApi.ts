import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IPcInfoResponse } from './types';
import { ICreatePcInfo } from '../../pages/adminPCInfoPage';
import { IUpdatePcInfo } from '../../components/adminPcInfoEditModal';

export const pcInfoApi = createApi({
  reducerPath: 'pcInfoApi',
  baseQuery: customFetchBase,
  tagTypes: ['PcInfo'],
  endpoints: (builder) => ({  
    createPcInfo: builder.mutation<IPcInfoResponse, ICreatePcInfo>({
      query(pcInfo) {
        return {
          url: '/pcinfo',
          method: 'POST',
          credentials: 'include',
          body: pcInfo,
        };
      },
      invalidatesTags: [{ type: 'PcInfo', id: 'LIST' }],
      transformResponse: (result: { data: { pcInfo: IPcInfoResponse } }) =>
        result.data.pcInfo,
    }),      

    getAllPcInfo: builder.query<any, void>({
       query() {
         return {
           url: `/pcinfo`,
           credentials: 'include',
         };
       },
       providesTags: (result) =>
         result
           ? [
               ...result.map(({ id }: any) => ({
                 type: 'PcInfo' as const,
                 id,
               })),
               { type: 'PcInfo', id: 'LIST' },
             ]
           : [{ type: 'PcInfo', id: 'LIST' }],
       transformResponse: (results: { data: { pcInfo: any} }) =>
         results?.data.pcInfo,
    }),

    updatePcInfo: builder.mutation<IPcInfoResponse, { id: string; pcInfo: IUpdatePcInfo }>(
      {
        query({ id, pcInfo }) {
          return {
            url: `/pcinfo/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: pcInfo,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'PcInfo', id },
                { type: 'PcInfo', id: 'LIST' },
              ]
            : [{ type: 'PcInfo', id: 'LIST' }],
        transformResponse: (response: { data: { pcInfo: IPcInfoResponse } }) =>
          response.data.pcInfo,
      }
    ),  
    deletePcInfo: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/pcinfo/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'PcInfo', id: 'LIST' }],
    }),
  }),
});
  
export const {
  useCreatePcInfoMutation,
  useGetAllPcInfoQuery,
  useUpdatePcInfoMutation,
  useDeletePcInfoMutation,
} = pcInfoApi;