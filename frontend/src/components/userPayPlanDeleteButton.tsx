import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeletePayPlanMutation } from '../redux/api/paymentApi';
import { toast } from 'react-toastify';

type IAdminPaymentStatusDeleteButtonProps = {
    payment_id: string;
  }
const UserPayPlanDeleteButton = ({ payment_id} : IAdminPaymentStatusDeleteButtonProps) => {

    const [deletePayment, { isLoading, error, isError }] = useDeletePayPlanMutation();

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
    
      const onDeleteHandler = () => {
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

export default UserPayPlanDeleteButton;