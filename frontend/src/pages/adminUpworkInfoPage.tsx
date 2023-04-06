import React, { useState, useEffect } from 'react';
import { Container } from "@mui/system";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { useCreateUpworkInfoMutation } from '../redux/api/upworkInfoApi';
import { toast } from 'react-toastify';
// import AdminUpworkInfoTable from '../components/adminUpworkInfoTable';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: white;
  font-weight: 500;
  border: 2px solid #222;
  margin-right: 1rem;
  background-color: cadetblue;
  border-radius: unset;
  border-color: cadetblue;
  width: 100px;
  &:hover {
    color: black;
  }
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const createUpworkInfoSchema = object({
    username: string(),
    account: string(),
})

export type ICreateUpworkInfo = TypeOf<typeof createUpworkInfoSchema>;

const AdminUpworkInfoPage = () => {
    // model action section
    const [modelShow, setModelShow] = useState(false);
    const modelHandleShow = () => setModelShow(true);

    const handleClose = () => {
      setModelShow(false);
      setValue('username', '');
      setValue('account', '');
    };
      
// report submitting section
    const methods = useForm<ICreateUpworkInfo>({
      resolver: zodResolver(createUpworkInfoSchema),
    });

    const {
      reset,
      handleSubmit,
      register,
      setValue,
      formState: { isSubmitting },
    } = methods;

    const [createUpworkInfo, { isLoading, isError, error, isSuccess }] =
    useCreateUpworkInfoMutation();

    useEffect(() => {
      if (isSuccess) {
        toast.success('PCInfo created successfully');
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
      if (isSubmitting) {
        reset();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitting]);

    const onSubmitHandler: SubmitHandler<ICreateUpworkInfo> = (values) => {
      createUpworkInfo(values);
      setModelShow(false);
      setValue('username', '')
      setValue('account', '');
    };

    return(
        <Container>
            <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>AdminUpworkInfoPage</h5>
        </Container>
    )
}

export default AdminUpworkInfoPage;