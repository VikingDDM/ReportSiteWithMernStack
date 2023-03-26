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
import { useCreatePcInfoMutation } from '../redux/api/pcInfoApi';
import { toast } from 'react-toastify';
import AdminPcInfoTable from '../components/adminPcInfoTable';

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

const createPcInfoSchema = object({
    username: string(),
    deviceName: string(),
    hardware: string(),
})

export type ICreatePcInfo = TypeOf<typeof createPcInfoSchema>;

const AdminPCInfoPage = () => {
    // model action section
    const [modelShow, setModelShow] = useState(false);
    const modelHandleShow = () => setModelShow(true);

    const handleClose = () => {
      setModelShow(false);
      setValue('username', '');
      setValue('deviceName', '');
      setValue('hardware', '');
    };
      
// report submitting section
    const methods = useForm<ICreatePcInfo>({
      resolver: zodResolver(createPcInfoSchema),
    });

    const {
      reset,
      handleSubmit,
      register,
      setValue,
      formState: { isSubmitting },
    } = methods;

    const [createPcInfo, { isLoading, isError, error, isSuccess }] =
    useCreatePcInfoMutation();

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

    const onSubmitHandler: SubmitHandler<ICreatePcInfo> = (values) => {
      createPcInfo(values);
      setModelShow(false);
      setValue('username', '')
      setValue('deviceName', '');
      setValue('hardware', '');
    };


    return(
        <Container>
          <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>PC Informtion</h5>
          <LoadingButton onClick={modelHandleShow}>
            Add
          </LoadingButton>
          <Modal
            open={modelShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >       
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                New PC Infomation?
              </Typography>
              <Box sx={{ width: '100%' }}>
                 <FormProvider {...methods}>
                   <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                        <Paper style={{boxShadow:"none"}}>
                          <p style={{margin:"unset", color:"gray"}}>Name</p>
                          <TextField
                            fullWidth 
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('username')}
                          />  
                          <p style={{margin:"unset", color:"gray"}}>DeviceName</p>
                          <TextField
                            fullWidth 
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('deviceName')}
                          />
                          <p style={{margin:"unset", color:"gray"}}>Hardware</p>
                          <TextField
                            fullWidth 
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('hardware')}
                          />
                        </Paper>
                        <React.Fragment>
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleClose}>close</Button>
                            <Button type='submit'>Save</Button>
                          </Box>
                        </React.Fragment>
                    </Box>
                  </FormProvider>
              </Box>
            </Box>
          </Modal>
        <AdminPcInfoTable />
      </Container>
    )
}

export default AdminPCInfoPage;