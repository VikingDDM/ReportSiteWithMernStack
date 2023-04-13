import { Container } from "@mui/system"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DashboardChart from "../components/dashboardChart";
import DashboardDeposits from "../components/dashboardDeposits";
import DashboardOrders from "../components/dashboardOrders";

const LandingPage = () => {
    return(
        <Container maxWidth={false}>
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
              <h5 style={{fontSize:"40px", color:"grey", marginBottom:"unset", marginTop:"30px"}}>Welcome To Our Team!</h5>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 400,
                      }}
                    >
                      <DashboardChart />
                    </Paper>
                  </Grid>
                  {/* Recent Deposits */}
                  <Grid item xs={12} md={4} lg={3}>
                      <DashboardDeposits />
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <DashboardOrders />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
        </Container>
    )
}

export default LandingPage;