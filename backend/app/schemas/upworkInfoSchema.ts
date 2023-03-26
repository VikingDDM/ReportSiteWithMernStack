import { object, string, TypeOf } from 'zod';

export const createUpworkInfoSchema = object({
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
      upworkinfoId: string(),
    }),
};

export const updateUpworkInfoSchema = object({
  ...params,
  body: object({
    username: string(),
    account: string(),
  }).partial(),
});

export const deleteUpworkInfoSchema = object({
  ...params,
});

export type CreateUpworkInfoInput = TypeOf<typeof createUpworkInfoSchema>['body'];
export type UpdateUpworkInfoInput = TypeOf<typeof updateUpworkInfoSchema>;
export type DeleteUpworkInfoInput = TypeOf<typeof deleteUpworkInfoSchema>['params'];