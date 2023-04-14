import { useEffect } from "react";
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateTimezoneMutation } from "../redux/api/userApi";
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

type IUserTimezoneEditModalProps = {
  modalShow: boolean;
  handleModalClose: () => void;
  timezoneInfo_id: any;
  defaultValueA: any;
}

const updateTimezoneSchema = object({
    serverTimezone: string().min(1, 'Time is required'),
}).partial();

export type IUpdateTimezoneInfo = TypeOf<typeof updateTimezoneSchema>;

const AdminTimezoneInfoEditModal = ({modalShow, handleModalClose, timezoneInfo_id, defaultValueA, } : IUserTimezoneEditModalProps) => {

    const [updateTimezoneInfo, { isLoading, isError, error, isSuccess }] = useUpdateTimezoneMutation();
    
    const methods = useForm<IUpdateTimezoneInfo>({
        resolver: zodResolver(updateTimezoneSchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        setValue,
        clearErrors,
        setError,
        formState: { isSubmitting, errors },
    } = methods;

    useEffect(() => {
      clearErrors('serverTimezone');
      setValue('serverTimezone', defaultValueA)
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
    
    const onSubmitHandler: SubmitHandler<IUpdateTimezoneInfo> = (values) => {
        if(values.serverTimezone !== undefined) {
            if(parseInt(values.serverTimezone) >14 || parseInt(values.serverTimezone) <-12 || Number.isInteger(parseFloat(values.serverTimezone)) !== true){
                setError('serverTimezone', { type: 'custom', message: 'Invalid Timezone' });
            } else {
                updateTimezoneInfo({ id: timezoneInfo_id, timezoneInfo: values });
                window.location.reload();
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
                  Set timezone? (from -12 to 14)
               </Typography>
               <Box sx={{ width: '100%' }}>
                <FormProvider {...methods}>
                   <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                        <Paper style={{boxShadow:"none"}}>
                          <p style={{margin:"unset", color:"gray"}}>Server Timezone</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueA}
                            type="number"
                            error={!!errors['serverTimezone']}
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('serverTimezone')}
                          /> 
                          {errors.serverTimezone && <p style={{margin:"unset", color:"red"}}>{errors.serverTimezone.message}</p>}
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

export default AdminTimezoneInfoEditModal;