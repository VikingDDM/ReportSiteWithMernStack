import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DashboardChartTitle from './dashboardChartTitle';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '23 Mar, 2023',
    'Oscar Dam',
    'Paypal',
    3000,
  ),
  createData(
    1,
    '23 Mar, 2023',
    'Oscar Dam',
    'Paypal',
    5000,
  ),
  createData(2, '16 Mar, 2019', 'John Doe', 'Payoneer', 100),
  createData(
    3,
    '22 Mar, 2023',
    'Oscar Dam',
    'Payoneer',
    500,
  ),
  createData(
    4,
    '15 Mar, 2023',
    'Oscar Dam',
    'Paypal',
    2000,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function DaxhboardOrders() {
  return (
    <React.Fragment>
      <DashboardChartTitle>Recent Orders</DashboardChartTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Pay Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}