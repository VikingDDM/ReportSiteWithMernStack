import * as React from 'react';
import { Container } from '@mui/system';
import FullScreenLoader from './fullScreenLoader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useGetMonthlyAllQuery } from '../redux/api/paymentApi';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { allPaymentHistory } from '../redux/selectors/paymentSelector';
import { useAppSelector } from '../redux/hooks';

export interface ChildProps{
  transUser: (users: any) => void,
}

const AdminPaymentStatusIllu = (props: ChildProps) => {
  const [chartData, setChartData] = React.useState([]);
  const [cardData, setCardData] = React.useState("");
  let gotUsers : any = [];

  const { isLoading, isError, error, data: allMonthlyHistory } = useGetMonthlyAllQuery(null);
  const payHistory = useAppSelector(allPaymentHistory);
  useEffect(() => {
    let iniChartData :any = [];
    if(payHistory !== undefined){
      if(payHistory[2]?.length !== 0){
        payHistory[2]?.map((planValue:any,key:any) => {
          let chartValue:any = {
            name: '',
            income: 0,
            plan: 0,
            amt: 2200,
          }
          chartValue.name = planValue.name;
          chartValue.plan = parseFloat(planValue.plan);
          const incomeValue = payHistory[1]?.find((value:any) => {return value.name === planValue.name; })
          if(Number.isNaN(incomeValue.eachMonthlyAmount)){incomeValue.income = 0}
          else { chartValue.income = parseFloat(incomeValue.eachMonthlyAmount) }
          iniChartData.push(chartValue);
        })
        setChartData(iniChartData);
      } else {
        let chartValue:any = {
          name: 'No body has set the plan.',
          income: 0,
          plan: 0,
          amt: 2200,
        }
        iniChartData[0] = chartValue;
        setChartData(iniChartData);
      }
      if(payHistory[0] !== null) {setCardData(payHistory[0]?.monthlyAmount);}
      else {setCardData('0');}
      gotUsers = payHistory[3];
      props.transUser(gotUsers);
   } 
  }, [payHistory])

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
      <Container>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height:300,
                  }}
                  style={{backgroundColor:"transparent"}}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={400}
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
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>    
                <Card sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 300,
                }}>
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
                      {payHistory[4]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{fontSize:"20px"}}>
                      {cardData}$
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    )
}

export default AdminPaymentStatusIllu;