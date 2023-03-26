import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import DashboardChartTitle from './dashboardChartTitle';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

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
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}