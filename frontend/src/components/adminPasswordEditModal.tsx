import { useEffect, useState } from "react";
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePWDMutation } from "../redux/api/userApi";
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

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

type IUserPWDEditModelProps = {
  modalShow: boolean;
  handleModalClose: () => void;
  pwdinfo_id: any;
  dataA:string
}

const updatePWDSchema = object({
    password: string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters')
}).partial();

export type IUpdatePWD = TypeOf<typeof updatePWDSchema>;

const AdminPasswordEditModal = ({modalShow, handleModalClose, pwdinfo_id, dataA} : IUserPWDEditModelProps) => {

    const [updatePWD, { isLoading, isError, error, isSuccess }] = useUpdatePWDMutation();
    
    const methods = useForm<IUpdatePWD>({
        resolver: zodResolver(updatePWDSchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        clearErrors,
        setValue,
        formState: { isSubmitting, errors },
    } = methods;

    useEffect(() => {
        clearErrors('password');
        setValue('password', '')
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
    
    const onSubmitHandler: SubmitHandler<IUpdatePWD> = (values) => {
      if (window.confirm('Are you sure, ' + dataA + '?')) {
        updatePWD({ id: pwdinfo_id, pswInfo: values });
        
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
                  Are you gonna change your password,{dataA}?
               </Typography>
               <Box sx={{ width: '100%' }}>
                <FormProvider {...methods}>
                   <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                        <Paper style={{boxShadow:"none"}}>
                          <p style={{margin:"unset", color:"gray"}}>New Password</p>
                          <TextField
                            fullWidth 
                            error={!!errors['password']}
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('password')}
                          />
                          {errors.password && <p style={{margin:"unset", color:"red"}}>{errors.password.message}</p>}
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

export default AdminPasswordEditModal;