import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeletePaymentMutation } from '../redux/api/paymentApi';
import { toast } from 'react-toastify';

type IAdminPaymentStatusDeleteButtonProps = {
    payment_id: string;
    settingPaymentID: () => void;
  }
const AdminPaymentStatusDeleteButton = ({payment_id, settingPaymentID} : IAdminPaymentStatusDeleteButtonProps) => {

    const [deletePayInfo, { isLoading, error, isSuccess, isError }] = useDeletePaymentMutation();

    useEffect(() => {
      settingPaymentID(); 
    }, [payment_id])

    useEffect(() => {
        if (isSuccess) {
          toast.success('Deleted successfully');
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
          deletePayInfo(id);
        }
    };

    return (
        <Button onClick={() => {onDeleteHandler(payment_id)}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminPaymentStatusDeleteButton;