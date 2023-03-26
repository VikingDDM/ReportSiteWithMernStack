import { object, string, TypeOf } from 'zod';

export const createFreelancerInfoSchema = object({
    body: object({
      username: string({
        required_error: 'Content is required',
      }),
      account: string({
        required_error: 'Content is required',
      }),
    }),
});

const params = {
    params: object({
      freelancerinfoId: string(),
    }),
};

export const updateFreelancerInfoSchema = object({
  ...params,
  body: object({
    username: string(),
    account: string(),
  }).partial(),
});

export const deleteFreelancerInfoSchema = object({
  ...params,
});

export type CreateFreelancerInfonput = TypeOf<typeof createFreelancerInfoSchema>['body'];
export type UpdateFreelancerInfoInput = TypeOf<typeof updateFreelancerInfoSchema>;
export type DeleteFreelancerInfoInput = TypeOf<typeof deleteFreelancerInfoSchema>['params'];