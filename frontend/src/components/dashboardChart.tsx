import React, { FunctionComponent } from "react";
import { useTheme } from '@mui/material/styles';
import { LineChart,
         Line,
         XAxis,
         YAxis,
         CartesianGrid,
         Tooltip,
         Legend,
         LabelList,
         ResponsiveContainer } from 'recharts';
import DashboardChartTitle from './dashboardChartTitle';
import { useGetYearlyAllQuery } from '../redux/api/paymentApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import FullScreenLoader from './fullScreenLoader';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="end"
        fill="#666"
        transform="rotate(0)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const data = [
  createData('Jan', undefined),
  createData('Feb', undefined),
  createData('Mar', undefined),
  createData('Apr', undefined),
  createData('May', undefined),
  createData('Jun', undefined),
  createData('Jul', undefined),
  createData('Aug', undefined),
  createData('Sep', undefined),
  createData('Oct', undefined),
  createData('Nov', undefined),
  createData('Dec', undefined),
];
const months = ['Jan','Feb','Mar','Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function DashboardChart() {
  const theme = useTheme();

  const { isLoading, isError, error, data: allYearlyHistory } = useGetYearlyAllQuery();

  useEffect(() => {
    if(allYearlyHistory !== undefined){
      allYearlyHistory[1].map((value:any,key:any) => {
        data[key] = createData(months[key], parseInt(value))
      })
    }
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
      <DashboardChartTitle>{"Total Income This Year (" + (new Date(new Date().toLocaleString("ja-JP")).getFullYear()).toString() + ")"}</DashboardChartTitle>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" height={20} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8">
            <LabelList content={<CustomizedLabel />} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}