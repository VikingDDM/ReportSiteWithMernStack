import { useEffect, useState } from "react";
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateRoleMutation } from "../redux/api/userApi";
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

type IUserRoleEditModelProps = {
  modalShow: boolean;
  handleModalClose: () => void;
  roleinfo_id: any;
  defaultValueA: any;
}

const updateRoleSchema = object({
    role: string(),
}).partial();

export type IUpdateRole = TypeOf<typeof updateRoleSchema>;

const AdminRoleEditModal = ({modalShow, handleModalClose, roleinfo_id, defaultValueA} : IUserRoleEditModelProps) => {

    const [updateRole, { isLoading, isError, error, isSuccess }] = useUpdateRoleMutation();
    const [roleSelect, setRoleSelect] = useState(''); 
    
    const methods = useForm<IUpdateRole>({
        resolver: zodResolver(updateRoleSchema),
    });

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRoleSelect(event.target.value as string);
      };

    const {
        reset,
        handleSubmit,
        register,
        setValue,
        formState: { isSubmitting },
    } = methods;

    register('role', {
        onChange: handleRoleChange,
      });

    useEffect(() => {
      setValue('role', defaultValueA)
    }, [modalShow])

    useEffect(() => {
        if (isSuccess) {
          handleModalClose();
          window.location.reload();
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
    
    const onSubmitHandler: SubmitHandler<IUpdateRole> = (values) => {
        updateRole({ id: roleinfo_id, roleInfo: values });
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
                            {...register('role')}
                          >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                          </Select>
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

export default AdminRoleEditModal;