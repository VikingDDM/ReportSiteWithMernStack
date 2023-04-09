import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteReportMutation } from '../redux/api/reportApi';
import { toast } from 'react-toastify';

type IUserDailyReportDeleteButtonProps = {
    report_id: string;
    settingReportID: () => void;
  }
const UserDailyReportDeleteButton = ({report_id, settingReportID} : IUserDailyReportDeleteButtonProps) => {

    const [deletePost, { isLoading, error, isError }] = useDeleteReportMutation();

    useEffect(() => {
      settingReportID(); 
    }, [report_id])

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
          deletePost(id);
        }
    };

    return (
        <Button style={{minWidth:"unset"}} onClick={() => {onDeleteHandler(report_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default UserDailyReportDeleteButton;