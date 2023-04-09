import { date, number, object, string, TypeOf } from 'zod';

export const createPayPlanSchema = object({
    body: object({
      name: string(),
      plan: string(),
      payPlanDate: string(),
    }),
});

export const createPayHistorySchema = object({
    body: object({
      name: string(),
      paymentWay: string(),
      realAmount: string(),
      rate: string(),
      amount: string(),
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
      payPlanDate: string(),
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