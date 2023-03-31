import { date, number, object, string, TypeOf } from 'zod';

export const createPayPlanSchema = object({
    body: object({
      name: string({ required_error: 'Content is required'}),
      plan: string({
        required_error: 'Value is required',
      }),
    }),
});

export const createPayHistorySchema = object({
    body: object({
      name: string({ required_error: 'Content is required'}),
      paymentWay: string(),
      amount: string({
        required_error: 'Value is required',
      }),
    }),
});

const params = {
    params: object({
      paymentId: string(),
    }),
};

export const updatePayHistorySchema = object({
  ...params,
  body: object({
    name: string(),
    paymentWay: string(),
    amount: string(),
  }).partial(),
});

export const updatePayPlanSchema = object({
    ...params,
    body: object({
      name: string(),
      plan: string(),
    }).partial(),
  });

export const deletePaymentSchema = object({
  ...params,
});

export const getAllPayHistorySchema = object({
  ...params,
});

export type CreatePayPlanInput = TypeOf<typeof createPayPlanSchema>['body'];
export type CreatePayHistoryInput = TypeOf<typeof createPayHistorySchema>['body'];
export type UpdatePayHistoryInput = TypeOf<typeof updatePayHistorySchema>;
export type UpdatePayPlanInput = TypeOf<typeof updatePayPlanSchema>;
export type DeletePaymentInput = TypeOf<typeof deletePaymentSchema>['params'];
export type getAllPayHistoryInput = TypeOf<typeof getAllPayHistorySchema>['params'];