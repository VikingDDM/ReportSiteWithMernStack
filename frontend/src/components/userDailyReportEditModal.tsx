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
import { useUpdateReportMutation } from "../redux/api/reportApi";
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

type IUserDailyReportEditModelProps = {
  modalShow: boolean;
  handleModalClose: () => void;
  report_id: any;
  defaultValueA: any;
  defaultValueB: any;
  defaultValueC: any;
  defaultValueD: any;
}

const updateReportSchema = object({
    Payment: string(),
    Project: string(),
    Study: string(),
    Extra: string(),
}).partial();

export type IUpdateReport = TypeOf<typeof updateReportSchema>;

const UserDailyReportEditModal = ({modalShow, handleModalClose, report_id, defaultValueA, defaultValueB, defaultValueC, defaultValueD} : IUserDailyReportEditModelProps) => {

    const [updateReport, { isLoading, isError, error, isSuccess }] = useUpdateReportMutation();
    
    const methods = useForm<IUpdateReport>({
        resolver: zodResolver(updateReportSchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        setValue,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
      setValue('Payment', defaultValueA)
      setValue('Project', defaultValueB)
      setValue('Study', defaultValueC)
      setValue('Extra', defaultValueD)
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
    
    const onSubmitHandler: SubmitHandler<IUpdateReport> = (values) => {
        updateReport({ id: report_id, report: values });
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
                          <p style={{margin:"unset", color:"gray"}}>Payment</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueA}
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('Payment')}
                          />  
                          <p style={{margin:"unset", color:"gray"}}>Project</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueB}
                            rows={2}
                            multiline
                            style={{ marginTop:"8px",paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('Project')}
                          />
                          <p style={{margin:"unset", color:"gray"}}>Study</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueC}
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('Study')}
                          />
                          <p style={{margin:"unset", color:"gray"}}>Extra</p>
                          <TextField
                            fullWidth 
                            defaultValue={defaultValueD}
                            rows={2}
                            multiline
                            style={{ marginTop:"8px", paddingRight:"10px", boxShadow:"none !important", paddingLeft:"10px"}}
                            {...register('Extra')}
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

export default UserDailyReportEditModal;