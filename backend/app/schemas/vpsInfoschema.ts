import { object, string, TypeOf } from 'zod';

export const createVpsInfoSchema = object({
    body: object({
      username: string({
        required_error: 'Content is required',
      }),
      vpsPassword: string({
        required_error: 'Content is required',
      }),
      vpsUrl: string({
        required_error: 'Content is required',
      }),
    }),
});

const params = {
    params: object({
      vpsinfoId: string(),
    }),
};

export const updateVpsInfoSchema = object({
  ...params,
  body: object({
    username: string(),
    vpsPassword: string(),
    vpsUrl: string(),
  }).partial(),
});

export const deleteVpsInfoSchema = object({
  ...params,
});

export type CreateVpsInfoInput = TypeOf<typeof createVpsInfoSchema>['body'];
export type UpdateVpsInfoInput = TypeOf<typeof updateVpsInfoSchema>;
export type DeleteVpsInfoInput = TypeOf<typeof deleteVpsInfoSchema>['params'];