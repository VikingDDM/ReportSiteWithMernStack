import * as React from 'react';
import Typography from '@mui/material/Typography';
import DashboardChartTitle from './dashboardChartTitle';

export default function DashboardDeposits() {
  return (
    <React.Fragment>
      <DashboardChartTitle>Monthly Amount</DashboardChartTitle>
      <Typography component="p" variant="h4">
        $16000
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 25 March, 2023
      </Typography>
    </React.Fragment>
  );
}