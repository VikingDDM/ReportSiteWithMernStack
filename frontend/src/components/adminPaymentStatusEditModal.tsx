import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePayHistoryMutation } from "../redux/api/paymentApi";
import { toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

type IUserPayInfoEditModelProps = {
  modalShow: boolean;
  handleModalClose: () => void;
  payHistory_id: any;
  defaultValueA: any;
  defaultValueB: any;
  defaultValueC: any;
  defaultValueD: any;
  selectUsers: any;
}

const updatePayHistorySchema = object({
     name: string(),
     paymentWay: string(),
     rate: string().min(1, 'Rate is required'),
     realAmount: string().min(1, 'Amount is required'),
     amount: string(),
}).partial();

export type IUpdatePayHistory = TypeOf<typeof updatePayHistorySchema>;

const AdminPaymentStatusEditModal = ({modalShow, handleModalClose, payHistory_id, defaultValueA, defaultValueB, defaultValueC, defaultValueD, selectUsers} : IUserPayInfoEditModelProps) => {

    const [nameSelect, setNameSelect] = useState('');  
    const handleNameSelectChange = (event: SelectChangeEvent) => {
      setNameSelect(event.target.value as string);
    };
    const [updatePayHistory, { isLoading, isError, error, isSuccess }] = useUpdatePayHistoryMutation();
    
    const methods = useForm<IUpdatePayHistory>({
        resolver: zodResolver(updatePayHistorySchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        setValue,
        setError,
        clearErrors,
        formState: { isSubmitting, errors },
    } = methods;

    register('name', {
      onChange: handleNameSelectChange,
    });
    useEffect(() => {
      setValue('name', defaultValueA)
      setValue('paymentWay', defaultValueB)
      setValue('rate', defaultValueC)
      setValue('realAmount', defaultValueD)
      setValue('amount', (Number(defaultValueC) * Number(defaultValueD)).toString())
      clearErrors('rate');
      clearErrors('realAmount');
    }, [modalShow])

    useEffect(() => {
        if (isSuccess) {
          handleModalClose();
        }
    
        if (isError) {
          if (Array.isArray((error as any).data.error)) {
            (error as any).data.error.forEach((el: any) =>
              toast.error(el.message, {
                position: "top-right",
              })
            );
          } else {
            toast.error((error as any).data.message, {
              position: "top-right",
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

    const onSubmitHandler: SubmitHandler<IUpdatePayHistory> = (values) => {
      if(values.rate !== undefined && values.realAmount !== undefined) {
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
        
        updatePayHistory({ id: payHistory_id, 
                           payment: {name:values.name, 
                                     paymentWay:values.paymentWay, 
                                     realAmount:values.realAmount, 
                                     rate:values.rate, 
                                     amount:amountValue} });   
        } else {
          setError('rate', { type: 'custom', message: 'Rate must between 1 and 0' });
        }
      }
    }

    return(
        <Modal
            open={modalShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >  
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  OverWriting?
               </Typography>
               <Box sx={{ width: '100%' }}>
                <FormProvider {...methods}>
                   <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                        <Paper style={{boxShadow:"none"}}>
                          <p style={{margin:"unset", color:"gray"}}>Name</p>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={defaultValueA}
                            fullWidth
                            style={{ marginTop:"2px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('name')}
                          >
                            {selectUsers.map((userForSelect : any, key: any) => {
                              return(
                                <MenuItem key = {key} value={userForSelect.name}>{userForSelect.name}</MenuItem>
                              )
                            })}
                          </Select>
                          <p style={{margin:"unset", color:"gray"}}>Payment Method</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueB}
                            style={{ marginTop:"8px",paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('paymentWay')}
                          />
                          <p style={{margin:"unset", color:"gray"}}>Rate</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueC}
                            error={!!errors['rate']}
                            type="number"
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('rate')}
                          />
                          {errors.rate && <p style={{margin:"unset", color:"red"}}>{errors.rate.message}</p>}
                          <p style={{margin:"unset", color:"gray"}}>Real Amount</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueD}
                            type="number"
                            error={!!errors['realAmount']}
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('realAmount')}
                          />
                          {errors.realAmount && <p style={{margin:"unset", color:"red"}}>{errors.realAmount.message}</p>}
                        </Paper>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleModalClose}>close</Button>
                            <Button type='submit'>Save</Button>
                          </Box>
                        </Box>
                </FormProvider>
               </Box>
            </Box>
          </Modal> 
    )
}

export default AdminPaymentStatusEditModal;