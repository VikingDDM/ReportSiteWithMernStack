import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteVpsInfoMutation } from '../redux/api/vpsInfoApi';
import { toast } from 'react-toastify';

type IAdminFreelancerInfoDeleteButtonProps = {
    info_id: string;
    settingVpsInfoID: () => void;
  }
const AdminVpsInfoDeleteButton = ({info_id, settingVpsInfoID} : IAdminFreelancerInfoDeleteButtonProps) => {

    const [deleteVpsInfo, { isLoading, error, isSuccess, isError }] = useDeleteVpsInfoMutation();
    
    useEffect(() => {
        settingVpsInfoID(); 
    }, [info_id])
    
    useEffect(() => {
        if (isSuccess) {
          toast.success('VPSInfo deleted successfully');
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
        if (window.confirm('Are you sure')) {
            deleteVpsInfo(id);
        }
    };

    return (
        <Button onClick={() => { onDeleteHandler(info_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminVpsInfoDeleteButton;