import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IFreelancerInfoResponse } from './types';
import { IUpdateFreelancerInfo } from '../../components/adminFreelancerInfoEditModal';
import { ICreateFreelancerInfo } from '../../pages/adminFreelancerInfoPage';

export const freelancerInfoApi = createApi({
  reducerPath: 'freelancerInfoApi',
  baseQuery: customFetchBase,
  tagTypes: ['FreelancerInfo'],
  endpoints: (builder) => ({  
    createFreelancerInfo: builder.mutation<IFreelancerInfoResponse, ICreateFreelancerInfo>({
      query(freelancerInfo) {
        return {
          url: '/freelancerInfo',
          method: 'POST',
          credentials: 'include',
          body: freelancerInfo,
        };
      },
      invalidatesTags: [{ type: 'FreelancerInfo', id: 'LIST' }],
      transformResponse: (result: { data: { freelancerInfo: IFreelancerInfoResponse } }) =>
        result.data.freelancerInfo,
    }),      

    getAllFreelancerInfo: builder.query<any, void>({
       query() {
         return {
           url: `/freelancerInfo`,
           credentials: 'include',
         };
       },
       providesTags: (result) =>
         result
           ? [
               ...result.map(({ id }: any) => ({
                 type: 'FreelancerInfo' as const,
                 id,
               })),
               { type: 'FreelancerInfo', id: 'LIST' },
             ]
           : [{ type: 'FreelancerInfo', id: 'LIST' }],
       transformResponse: (results: { data: { freelancerInfo: any} }) =>
         results?.data.freelancerInfo,
    }),

    updateFreelancerInfo: builder.mutation<IFreelancerInfoResponse, { id: string; freelancerInfo: IUpdateFreelancerInfo }>(
      {
        query({ id, freelancerInfo }) {
          return {
            url: `/freelancerInfo/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: freelancerInfo,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: 'FreelancerInfo', id },
                { type: 'FreelancerInfo', id: 'LIST' },
              ]
            : [{ type: 'FreelancerInfo', id: 'LIST' }],
        transformResponse: (response: { data: { freelancerInfo: IFreelancerInfoResponse } }) =>
          response.data.freelancerInfo,
      }
    ),  
    deleteFreelancerInfo: builder.mutation<any, string>({
      query(id) {
        return {
          url: `/freelancerInfo/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'FreelancerInfo', id: 'LIST' }],
    }),
  }),
});
  
export const {
  useCreateFreelancerInfoMutation,
  useGetAllFreelancerInfoQuery,
  useUpdateFreelancerInfoMutation,
  useDeleteFreelancerInfoMutation,
} = freelancerInfoApi;