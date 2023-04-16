import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeletePaymentMutation } from '../redux/api/paymentApi';
import { toast } from 'react-toastify';

type IAdminPaymentStatusDeleteButtonProps = {
    payment_id: string;
  }
const AdminPaymentStatusDeleteButton = ({ payment_id} : IAdminPaymentStatusDeleteButtonProps) => {

    const [deletePayment, { isLoading, error, isSuccess, isError }] = useDeletePaymentMutation();

    useEffect(() => {
        if (isSuccess) {
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
    
      const onDeleteHandler = () => {
        console.log(payment_id)
        if (window.confirm('Are you sure')) {
          deletePayment(payment_id);
        }
    };

    return (
        <Button style={{minWidth:"unset"}} onClick={() => {onDeleteHandler()}}>
            <DeleteForeverIcon style={{color:"tomato"}} />
        </Button>
    )
}

export default AdminPaymentStatusDeleteButton;