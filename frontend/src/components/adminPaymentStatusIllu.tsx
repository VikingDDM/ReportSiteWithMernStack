import * as React from 'react';
import { Container } from '@mui/system';
import FullScreenLoader from './fullScreenLoader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useGetMonthlyAllQuery } from '../redux/api/paymentApi';


const AdminPaymentStatusIllu = () => {
  const [chartData, setChartData] = React.useState([]);
  const [cardData, setCardData] = React.useState("");

  const { isLoading, isError, error, data: allMonthlyHistory } = useGetMonthlyAllQuery();
  console.log(allMonthlyHistory)
  useEffect(() => {
    let iniChartData :any = [];
    if(allMonthlyHistory !== undefined){
      if(allMonthlyHistory[2].length !== 0){
        allMonthlyHistory[2]?.map((planValue:any,key:any) => {
          let chartValue:any = {
            name: '',
            income: 0,
            plan: 0,
            amt: 2200,
          }
          chartValue.name = planValue.name;
          chartValue.plan = parseInt(planValue.plan);
          const incomeValue = allMonthlyHistory[1]?.find((value:any) => {return value.name === planValue.name; })
          if(Number.isNaN(incomeValue.eachMonthlyAmount)){incomeValue.income = 0}
          else { chartValue.income = parseInt(incomeValue.eachMonthlyAmount) }
          iniChartData.push(chartValue);
        })
      } else {
        let chartValue:any = {
          name: 'No body has set the plan.',
          income: 0,
          plan: 0,
          amt: 2200,
        }
        iniChartData[0] = chartValue;
      }
      if(allMonthlyHistory[0] !== null) {setCardData(allMonthlyHistory[0].monthlyAmount);}
      else {setCardData('0');}
   } 
    setChartData(iniChartData);
  }, [allMonthlyHistory])

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

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display:"flex" }}>
            <Grid item xs={12} md={8} lg={9}>
              <BarChart
                width={700}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#8884d8" background={{ fill: '#eee' }} />
                <Bar dataKey="plan" fill="#82ca9d" />
              </BarChart>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Card sx={{  display: 'flex', flexDirection: 'column', width: 270 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image='/monthlyPay.jpg'
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Amount
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{fontSize:"20px"}}>
                    {cardData}$
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>
    )
}

export default AdminPaymentStatusIllu;