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
import { useUpdateUpworkInfoMutation } from "../redux/api/upworkInfoApi";
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

type IUserUpworkInfoEditModelProps = {
  modalShow: boolean;
  handleModalClose: () => void;
  upworkInfo_id: any;
  defaultValueA: any;
  defaultValueB: any;
}

const updateUpworkInfoSchema = object({
    username: string(),
    account: string(),
}).partial();

export type IUpdateUpworkInfo = TypeOf<typeof updateUpworkInfoSchema>;

const AdminUpworkInfoEditModal = ({modalShow, handleModalClose, upworkInfo_id, defaultValueA, defaultValueB } : IUserUpworkInfoEditModelProps) => {

    const [updateUpworkInfo, { isLoading, isError, error, isSuccess }] = useUpdateUpworkInfoMutation();
    
    const methods = useForm<IUpdateUpworkInfo>({
        resolver: zodResolver(updateUpworkInfoSchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        setValue,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
      setValue('username', defaultValueA)
      setValue('account', defaultValueB)
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
    
    const onSubmitHandler: SubmitHandler<IUpdateUpworkInfo> = (values) => {
        updateUpworkInfo({ id: upworkInfo_id, upworkInfo: values });
        setValue('username', '')
        setValue('account', '')
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
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueA}
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('username')}
                          />  
                          <p style={{margin:"unset", color:"gray"}}>Account</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueB}
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('account')}
                          />
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

export default AdminUpworkInfoEditModal;