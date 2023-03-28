import React, { useState, useEffect } from 'react';
import { Container } from '@mui/system';
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
import { useCreatePayHistoryMutation } from '../redux/api/paymentApi';
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AdminPaymentStatusTable from '../components/adminPaymentStatusTable';
import AdminPaymentStatusIllu from '../components/adminPaymentStatusIllu';

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

const createPayHistorySchema = object({
    name: string(),
    paymentWay: string(),
    amount: string(),
})

export type ICreatePayHistory = TypeOf<typeof createPayHistorySchema>;

const AdminPaymentStatusPage = () => {
    // model action section
    const [modelShow, setModelShow] = useState(false);
    const modelHandleShow = () => setModelShow(true);
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };

    const handleClose = () => {
      setModelShow(false);
      setValue('name', '');
      setValue('paymentWay', '');
      setValue('amount', '');
    };
      
// report submitting section
    const methods = useForm<ICreatePayHistory>({
      resolver: zodResolver(createPayHistorySchema),
    });

    const {
      reset,
      handleSubmit,
      register,
      setValue,
      formState: { isSubmitting },
    } = methods;

    const [createPayHistory, { isLoading, isError, error, isSuccess }] =
    useCreatePayHistoryMutation();

    useEffect(() => {
      if (isSuccess) {
        toast.success('Created successfully');
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

    const onSubmitHandler: SubmitHandler<ICreatePayHistory> = (values) => {
      createPayHistory(values);
      setModelShow(false);
      setValue('name', '')
      setValue('paymentWay', '');
      setValue('amount', '');
    };


    return(
        <Container>
          <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>Payment Status This Month</h5>
          <AdminPaymentStatusIllu />
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
                New Incoming?
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
                            {...register('name')}
                          />  
                          {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            fullWidth
                            onChange={handleChange}
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
                          <p style={{margin:"unset", color:"gray"}}>Payment Mothod</p>
                          <TextField
                            fullWidth 
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('paymentWay')}
                          />
                          <p style={{margin:"unset", color:"gray"}}>Amount</p>
                          <TextField
                            fullWidth 
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('amount')}
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
        <AdminPaymentStatusTable />
      </Container>
    )
}

export default AdminPaymentStatusPage;