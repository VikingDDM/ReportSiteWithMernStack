import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteFreelancerInfoMutation } from '../redux/api/freelancerInfoApi';
import { toast } from 'react-toastify';

type IAdminFreelancerInfoDeleteButtonProps = {
    info_id: string;
    settingFreelancerInfoID: () => void;
  }
const AdminFreelancerInfoDeleteButton = ({info_id, settingFreelancerInfoID} : IAdminFreelancerInfoDeleteButtonProps) => {

    const [deleteFreelancerInfo, { isLoading, error, isSuccess, isError }] = useDeleteFreelancerInfoMutation();

    useEffect(() => {
      settingFreelancerInfoID(); 
    }, [info_id])

    useEffect(() => {
        if (isSuccess) {
          toast.success('Post deleted successfully');
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
            deleteFreelancerInfo(id);
        }
    };

    return (
        <Button onClick={() => { onDeleteHandler(info_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminFreelancerInfoDeleteButton;