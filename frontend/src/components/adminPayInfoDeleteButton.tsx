import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeletePayInfoMutation } from '../redux/api/payInfoApi';
import { toast } from 'react-toastify';

type IAdminPayInfoDeleteButtonProps = {
    info_id: string;
  }
const AdminPayInfoDeleteButton = ({info_id} : IAdminPayInfoDeleteButtonProps) => {

    const [deletePayInfo, { isLoading, error, isError }] = useDeletePayInfoMutation();

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
    
      const onDeleteHandler = (id: string) => {

        if (window.confirm('Are you sure')) {
          deletePayInfo(id);
        }
    };

    return (
        <Button style={{minWidth:"unset"}} onClick={() => {onDeleteHandler(info_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminPayInfoDeleteButton;