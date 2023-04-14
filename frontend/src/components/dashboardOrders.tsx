import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DashboardChartTitle from './dashboardChartTitle';
import { useGetYearlyAllQuery } from '../redux/api/paymentApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import FullScreenLoader from './fullScreenLoader';

// Generate Order Data
function createData(
  id: any,
  date: any,
  name: any,
  paymentMethod: any,
  amount: any,
) {
  return { id, date, name, paymentMethod, amount };
}



function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function DashboardOrders() {
  const [rows, setRows] = React.useState([]);
  const { isLoading, isError, error, data: allYearlyHistory } = useGetYearlyAllQuery();

  useEffect(() => {
    let recentPays : any = [];
    if(allYearlyHistory !== undefined){
      allYearlyHistory[2].map((recentData:any) => {
        recentPays.push(
          createData(
            recentData.id,
            (new Date(recentData.created_at)).toLocaleString("ja-JP"),
            recentData.name,
            recentData.paymentWay,
            recentData.amount,
          )
        )
      })
    }
    setRows(recentPays);
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
      <DashboardChartTitle>Recent Incomes</DashboardChartTitle>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Payment Method</b></TableCell>
            <TableCell align="right"><b>Pay Amount</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row : any, key:any) => (
            <TableRow key={key}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}