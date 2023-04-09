import { Container } from "@mui/system";
import { useEffect, useState, FunctionComponent } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart,
         Line,
         XAxis,
         YAxis,
         CartesianGrid,
         Tooltip,
         Legend,
         LabelList,
         PieChart, Pie, Sector,
         BarChart, Bar, 
         ResponsiveContainer } from 'recharts';
import DashboardChartTitle from './dashboardChartTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// EachMonthTotalChart
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
  const months = ['Jan','Feb','Mar','Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // PinChart
  const pinChartdata:any = [{name:"no name", value:0.1}];
  const renderActiveShape = (props:any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 4) * cos;
    const sy = cy + (outerRadius + 4) * sin;
    const mx = cx + (outerRadius + 4) * cos;
    const my = cy + (outerRadius + 4) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={4} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fill="#333">{`${value}$`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };

  // BarChart

const AdminAllPayHistoryIllu = (payHistory:any) => {
    const theme = useTheme();
    const [barChartData, setBarChartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState("0");
    // EachMonthTotalChart
    useEffect(() => {
       
        if(payHistory.payHistory.length !== 0){
          if(payHistory.payHistory[1] !== undefined){
            payHistory.payHistory[1].map((value:any,key:any) => {
                data[key] = createData(months[key], parseInt(value))
              })
          }
          if(payHistory.payHistory[0] !==null) {
            setTotalAmount(payHistory.payHistory[0]);
          }
          if(payHistory.payHistory[2] !==undefined) {
            payHistory.payHistory[2].map((eachVal:any,key:any) => {
              pinChartdata[key] = {name:eachVal.name, value:eachVal.yearlyIndividualAmount}
            }) 
          }
          if(payHistory.payHistory[3] !== undefined){
            let iniChartData:any = [];
            payHistory.payHistory[3]?.map((eachVal:any,key:any) => {
              let chartValue:any = {
                name: '',
                income: 0,
                amt: 2200,
              }
              chartValue.income = parseInt(eachVal.eachMonthlyAmount);
              chartValue.name = eachVal.name
              iniChartData[key] = chartValue;
              })
              setBarChartData(iniChartData)
            }
        }
      },[payHistory.payHistory])
      // PinChart
      const [activeIndex, setActiveIndex] = useState(0);
    
      const onPieEnter = (_:any, index:any) => {
        setActiveIndex(index)
      };



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
                  <Grid item xs={12} md={7} lg={7}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 400,
                      }}
                    >
                      <DashboardChartTitle>{"Monthly Income History"}</DashboardChartTitle>
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
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={5} lg={5}>
                    <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 400,
                        }}
                    >
                      <DashboardChartTitle>{"Yearly Income History"}</DashboardChartTitle>
                      <DashboardChartTitle>{totalAmount + "$"}</DashboardChartTitle>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={pinChartdata}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>
                 
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400,}}>
                    <DashboardChartTitle>{"Monthly Individual Income History"}</DashboardChartTitle>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={200}
                        height={100}
                        data={barChartData}
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
                        </BarChart> 
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
        </Container>
    )
}

export default AdminAllPayHistoryIllu;