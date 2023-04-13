import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

const params = {
  params: object({
    userinfoId: string(),
  }),
};

export const updateRoleSchema = object({
  ...params,
  body: object({
    role: string(),
  }).partial(),
});

export const updatePasswordSchema = object({
  ...params,
  body: object({
    password: string(),
  }).partial(),
});

export const deleteUserSchema = object({
  ...params,
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid email or password'
    ),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>;
export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>["params"];
