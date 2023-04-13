import * as React from 'react';
import Typography from '@mui/material/Typography';
import DashboardChartTitle from './dashboardChartTitle';
import { useGetYearlyAllQuery } from '../redux/api/paymentApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import FullScreenLoader from './fullScreenLoader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function DashboardDeposits() {
  const { isLoading, isError, error, data: allYearlyHistory } = useGetYearlyAllQuery();
  const [amount, setAmount] = React.useState("")
 
  useEffect(() => {
    let totalAmount = "0";
    if(allYearlyHistory !== undefined){
      totalAmount = allYearlyHistory[0]
    }
    setAmount(totalAmount);
  },[allYearlyHistory])
 
  useEffect(() => {
    if (isError) {
      if (Array.isArray((error as any)?.data?.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any)?.data?.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <React.Fragment>
      <Card sx={{display: 'flex', flexDirection: 'column',height: 400}}>
        <CardMedia
          sx={{ height: 300 }}
          image='/dashboard.jpg'
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Total Amount
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{fontSize:"20px"}}>
            {allYearlyHistory[3]}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{fontSize:"20px"}}>
            {amount}$
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}