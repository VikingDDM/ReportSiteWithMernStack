import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from "../components/formInput";
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useSignupUserMutation } from '../redux/api/authApi';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: darkbkue;
  color: white;
  font-weight: 500;

  &:hover {
    background-color: lightblue;
    color: darkbkue;
  }
`;
const FormGrid = styled(Grid)`
  width: 100%;
  margin-left: unset;
`;

const signupSchema = object({
    name: string().min(1, 'Full name is required').max(100),
    email: string()
      .min(1, 'Email address is required')
      .email('Email Address is invalid'),
    password: string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().min(1, 'Please confirm your password'),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});
export type SignupInput = TypeOf<typeof signupSchema>;

const SignupPage = () => {
    const methods = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
      });
    
    
    const [SignupUser, { isLoading, isSuccess, error, isError, data }] =
      useSignupUserMutation();

    const navigate = useNavigate();

    const {
      reset,
      handleSubmit,
      formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
      if (isSuccess) {
        toast.success(data?.message);
        navigate('/signin');
      }

      if (isError) {
        if (Array.isArray((error as any).data.error)) {
          (error as any).data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error as any).data.message, {
            position: 'top-right',
          });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
      if (isSubmitSuccessful) {
        reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<SignupInput> = (values) => {
      // 👇 Executing the SignupUser Mutation
      SignupUser(values);
    };

    return (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <FormProvider {...methods}>
              <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)} autoComplete='off' sx={{ mt: 3 }}>
                <FormGrid container spacing={2}>
                  <FormInput name='name' label='Full Name' />
                  <FormInput name='email' label='Email Address' type='email' />
                  <FormInput name='password' label='Password' type='password' />
                  <FormInput
                     name='passwordConfirm'
                     label='Confirm Password'
                     type='password'
                  />
                </FormGrid>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </LoadingButton>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to='/signin'>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </FormProvider>
          </Box>
        </Container>
    )
}

export default SignupPage;