import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteUserMutation } from '../redux/api/userApi';
import { toast } from 'react-toastify';

type IAdminUserDeleteButtonProps = {
    info_id: string;
    buttonStyle: string;
  }
const AdminUserDeleteButton = ({info_id, buttonStyle} : IAdminUserDeleteButtonProps) => {

    const [deleteUser, { isLoading, error, isError, isSuccess }] = useDeleteUserMutation();

    useEffect(() => {
        if(isSuccess) {
          window.location.reload();
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
    
      const onDeleteHandler = (id: string) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
          deleteUser(id);
        }
    };

    return (
        <Button style={{minWidth:"unset", display:buttonStyle}} onClick={() => {onDeleteHandler(info_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminUserDeleteButton;