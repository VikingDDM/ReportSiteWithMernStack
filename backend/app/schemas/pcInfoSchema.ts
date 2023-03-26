import { object, string, TypeOf } from 'zod';

export const createPcInfoSchema = object({
    body: object({
      username: string({
        required_error: 'Content is requiredA',
      }),
      deviceName: string({
        required_error: 'Content is requiredB',
      }),
      hardware: string({
        required_error: 'Content is requiredC',
      }),
    }),
});

const params = {
    params: object({
      pcinfoId: string(),
    }),
};

export const updatePcInfoSchema = object({
  ...params,
  body: object({
    username: string(),
    devicename: string(),
    hardware: string(),
  }).partial(),
});

export const deletePcInfoSchema = object({
  ...params,
});

export type CreatePcInfoInput = TypeOf<typeof createPcInfoSchema>['body'];
export type UpdatePcInfoInput = TypeOf<typeof updatePcInfoSchema>;
export type DeletePcInfoInput = TypeOf<typeof deletePcInfoSchema>['params'];