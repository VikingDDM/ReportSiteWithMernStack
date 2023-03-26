import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import DashboardChartTitle from './dashboardChartTitle';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const data = [
  createData('Jan', 5000),
  createData('Feb', 12000),
  createData('Mar', 15000),
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

export default function DashboardChart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <DashboardChartTitle>This Month</DashboardChartTitle>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Payment ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}