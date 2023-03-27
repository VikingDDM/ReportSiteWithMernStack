import { Container } from '@mui/system';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      income: 3490,
      plan: 4300,
      amt: 2100,
    },
  ];

const AdminPaymentStatusIllu = () => {

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display:"flex" }}>
            <Grid item xs={12} md={8} lg={9}>
              <BarChart
                width={700}
                height={300}
                data={data}
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
              <Card sx={{  display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image='/monthlyPay.jpg'
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>
    )
}

export default AdminPaymentStatusIllu;