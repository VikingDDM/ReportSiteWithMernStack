import { object, string, TypeOf } from 'zod';

export const createReportSchema = object({
    body: object({
      Payment: string({
        required_error: 'Content is required',
      }),
      Project: string({
        required_error: 'Content is required',
      }),
      Study: string({
        required_error: 'Content is required',
      }),
      Extra: string({
        required_error: 'Content is required',
      }),
      Username: string()
    }),
});

const params = {
    params: object({
      reportId: string(),
    }),
};

export const updateReportSchema = object({
  ...params,
  body: object({
    Payment: string(),
    Project: string(),
    Study: string(),
    Extra: string(),
  }).partial(),
});

export const deleteReportSchema = object({
  ...params,
});

export type CreateReportInput = TypeOf<typeof createReportSchema>['body'];
export type UpdateReportInput = TypeOf<typeof updateReportSchema>;
export type DeleteReportInput = TypeOf<typeof deleteReportSchema>['params'];