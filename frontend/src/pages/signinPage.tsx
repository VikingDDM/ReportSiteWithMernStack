import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from "../components/formInput";
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useSigninUserMutation } from '../redux/api/authApi';
import { userApi } from "../redux/api/userApi";

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

const signinSchema = object({
    email: string()
      .min(1, 'Email address is required')
      .email('Email Address is invalid'),
    password: string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  });
  
export type SigninInput = TypeOf<typeof signinSchema>;

const SigninPage = () => {
      const methods = useForm<SigninInput>({
        resolver: zodResolver(signinSchema),
      });
    
      // 👇 API Login Mutation
      const [loginUser, { isLoading, isError, error, isSuccess }] =
      useSigninUserMutation();
    
      const navigate = useNavigate();
      const location = useLocation();

      const user = userApi.endpoints.getMe.useQueryState(null, {
        selectFromResult: ({ data }) => data!,
      });
    
      useEffect(() => {
        let from = '';
        if(user?.role === 'user'){
          from = (((location.state as any)?.from.pathname as string) || '/user/landing');
        } else if(user?.role === 'admin') {
          from = ((location.state as any)?.from.pathname as string) || '/admin/landing';
        }
        navigate(from);
      }, [user?.role])

      const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
      } = methods;
    
      useEffect(() => {
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
    
      const onSubmitHandler: SubmitHandler<SigninInput> = (values) => {
        // 👇 Executing the loginUser Mutation
        loginUser(values);
    };
    
      return (
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <FormProvider {...methods}>
                <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} autoComplete='off' noValidate sx={{ mt: 1 }}>
                  <FormInput name='email' label='Email Address' type='email' />
                  <FormInput name='password' label='Password' type='password' />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disableElevation
                    loading={isLoading}
                  >
                    Sign In
                  </LoadingButton>
                  <Grid container>
                    <Grid item xs>
                      <Link to='/signup' style={{color:"darkblue"}}>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to='/signup' style={{color:"darkblue"}}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </FormProvider>
            </Box>
          </Container>
      );
}

export default SigninPage;
