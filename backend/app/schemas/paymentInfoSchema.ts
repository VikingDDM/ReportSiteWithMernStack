import { object, string, TypeOf } from 'zod';

export const createPayInfoSchema = object({
    body: object({
      username: string(),
      category: string({
        required_error: 'Content is required',
      }),
      account: string({
        required_error: 'Content is required',
      })
    }),
});

const params = {
    params: object({
      payinfoId: string(),
    }),
};

export const updatePayInfoSchema = object({
  ...params,
  body: object({
    username: string(),
    category: string(),
    account: string(),
  }).partial(),
});

export const deletePayInfoSchema = object({
  ...params,
});

export type CreatePayInfoInput = TypeOf<typeof createPayInfoSchema>['body'];
export type UpdatePayInfoInput = TypeOf<typeof updatePayInfoSchema>;
export type DeletePayInfoInput = TypeOf<typeof deletePayInfoSchema>['params'];