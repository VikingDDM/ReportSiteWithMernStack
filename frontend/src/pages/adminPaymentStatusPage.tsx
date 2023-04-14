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
import { FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { useCreatePayHistoryMutation } from '../redux/api/paymentApi';
import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
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
    name: string().min(1, 'Name is required'),
    paymentWay: string().min(1, 'Payment method is required'),
    rate: string().min(1, 'Rate is required'),
    realAmount: string().min(1, 'Amount is required'),
    amount: string(),
}).refine((data) => parseFloat(data.rate)<=1 && parseFloat(data.rate)>0, {
  path: ['rate'],
  message: 'Rate must between 1 and 0',
});

export type ICreatePayHistory = TypeOf<typeof createPayHistorySchema>;

const AdminPaymentStatusPage = () => {
    // model action section
    const [modelShow, setModelShow] = useState(false);
    const modelHandleShow = () => {setModelShow(true); setValue('rate', '1'); }
    const [nameSelect, setNameSelect] = React.useState('');
    const [usersForSelect, setUsersForSelect] = React.useState([]);
    const handleNameSelectChange = (event: SelectChangeEvent) => {
      setNameSelect(event.target.value as string);
      setValue('name', nameSelect);
    };

    const handleClose = () => {
      setModelShow(false);
      setValue('name', '');
      setValue('paymentWay', '');
      setValue('realAmount', '');
      setValue('rate', '1');
      clearErrors('name');
      clearErrors('paymentWay');
      clearErrors('realAmount');
      clearErrors('rate');
    };
      
// report submitting section
    const methods = useForm<ICreatePayHistory>({
      resolver: zodResolver(createPayHistorySchema),
    });

    const {
      handleSubmit,
      register,
      setValue,
      getValues,
      clearErrors ,
      formState: { errors },
    } = methods;
    const rateVal = getValues("rate");
    const realAmountVal = getValues("realAmount");
    const amountVal = (Number(rateVal) * Number(realAmountVal)).toString();

    register('name', {
      onChange: handleNameSelectChange,
    });
    register('amount', {
      value: amountVal
    });

    const [createPayHistory, { isLoading, isError, error, isSuccess }] =
    useCreatePayHistoryMutation();

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

    const onSubmitHandler: SubmitHandler<ICreatePayHistory> = (values) => {
      if(parseFloat(values.rate) > 0 && parseFloat(values.rate) <= 1){
        let rateFloat = parseFloat(values.rate) * 10;
        let realAmountFloat = parseFloat(values.realAmount) * 10;
        let ratePointNum = 1;
        let realAmountPointNum = 1;
        if(Number.isInteger(rateFloat) !== true){
          while(Number.isInteger(rateFloat) !== true ) {
            rateFloat = rateFloat * 10;
            ratePointNum ++;
          }
        }
        if(Number.isInteger(realAmountFloat) !== true) {
          while(Number.isInteger(realAmountFloat) !== true ) {
            realAmountFloat = realAmountFloat * 10;
            realAmountPointNum ++;
          }
        }
      const amountValue = ((rateFloat * realAmountFloat)/Math.pow(10, (ratePointNum + realAmountPointNum))).toString();
      createPayHistory({name:values.name, 
                        paymentWay:values.paymentWay, 
                        realAmount:values.realAmount, 
                        rate:values.rate, 
                        amount:amountValue});
      setModelShow(false);
      setValue('name', '');
      setValue('paymentWay', '');
      setValue('realAmount', '');
      setValue('rate', '1');
      }
    };

    return(
        <Container maxWidth={false}>
          <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>Incoming Status This Month</h5>
          <AdminPaymentStatusIllu transUser={(users :any ) => setUsersForSelect(users)} />
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
                          <Select
                            defaultValue={""}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            error={!!errors['name']}
                            style={{ marginTop:"2px",marginLeft:"10px", width:"98.3%", paddingRight:"12px", paddingLeft:"12px"}}
                            {...register('name')}
                          >
                            {usersForSelect?.map((userForSelect : any, key: any) => {
                              return(
                                <MenuItem key = {key} value={userForSelect.name}>{userForSelect.name}</MenuItem>
                              )
                            })}
                          </Select>
                          {errors.name && <p style={{margin:"unset", color:"red"}}>{errors.name.message}</p>}
                          <p style={{margin:"unset", color:"gray"}}>Payment Mothod</p>
                          <TextField
                            fullWidth 
                            error={!!errors['paymentWay']}
                            style={{ marginTop:"2px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('paymentWay')}
                          />
                          {errors.paymentWay && <p style={{margin:"unset", color:"red"}}>{errors.paymentWay.message}</p>}
                          <p style={{margin:"unset", color:"gray"}}>Rate</p>
                          <TextField
                            id="outlined-number"
                            fullWidth
                            type="number"
                            error={!!errors['rate']}
                            style={{ marginTop:"2px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('rate')}
                          />
                          {errors.rate && <p style={{margin:"unset", color:"red"}}>{errors.rate.message}</p>}
                          <p style={{margin:"unset", color:"gray"}}>Paid Amount($)</p>
                          <TextField
                            id="outlined-number"
                            fullWidth
                            error={!!errors['realAmount']}
                            type="number"
                            style={{ marginTop:"2px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('realAmount')}
                          />
                          {errors.realAmount && <p style={{margin:"unset", color:"red"}}>{errors.realAmount.message}</p>}
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
        <AdminPaymentStatusTable/>
      </Container>
    )
}

export default AdminPaymentStatusPage;