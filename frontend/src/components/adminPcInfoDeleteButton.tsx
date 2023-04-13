import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeletePcInfoMutation } from '../redux/api/pcInfoApi';
import { toast } from 'react-toastify';

type IAdminFreelancerInfoDeleteButtonProps = {
    info_id: string;
  }
const AdminPcInfoDeleteButton = ({info_id}: IAdminFreelancerInfoDeleteButtonProps) => {

    const [deletePcInfo, { isLoading, error, isError }] = useDeletePcInfoMutation();

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
            deletePcInfo(id);
        }
    };

    return (
        <Button style={{minWidth:"unset"}} onClick={() => { onDeleteHandler(info_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminPcInfoDeleteButton;