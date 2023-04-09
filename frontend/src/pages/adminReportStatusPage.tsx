import { Container } from "@mui/system"
import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import FullScreenLoader from '../components/fullScreenLoader';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useGetReportStatusQuery } from '../redux/api/reportApi';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "silver",
      color: "white",
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: "1px solid grey"
    },
}));
  
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
  
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const AdminReportStatusPage = () => {
    const [weekend, setWeekend] = React.useState('');
    const [reportStatus, setReportStatus] = React.useState([]);
    const [unreportedNames, setUnreportedNames] = React.useState([]);
    const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs());
    const [selectDateValue, setSelectDateValue] = React.useState(new Date().toISOString());
    const { isLoading, isError, error, data: reportStatusWithUsers } = useGetReportStatusQuery(selectDateValue);
   
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reportStatusWithUsers[0]?.length) : 0;

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      if(reportStatusWithUsers !== undefined) {
        let unreportedUserList:any = []
        setReportStatus(reportStatusWithUsers[0])
        reportStatusWithUsers[1].map((userValue:any) => {
          const unreportFilter = reportStatusWithUsers[0].find((reportValue:any) => {
            return reportValue.Username === userValue.name
          })
          if(unreportFilter === undefined) {
            unreportedUserList.push(userValue.name);
          }
        })
        setUnreportedNames(unreportedUserList);
      }
    },[reportStatusWithUsers])

    useEffect(() => {
      if(dateValue !== null){
        const virtualDate = dateValue.toDate();
        if(virtualDate.getDay() === 0 || virtualDate.getDay() === 6){
          setWeekend("(It was weekend)")
        }
        const second = virtualDate.getSeconds() + (Math.random() * 10);
        virtualDate.setSeconds(second);
        const submitDate = virtualDate.toISOString();
        setSelectDateValue(submitDate);
      }
      }, [dateValue]);

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
        <Container>
           <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>Report History</h5>
           <h5 style={{fontSize:"20px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}><span style={{color:"brown"}}>{unreportedNames.toString()}</span> haven't reported this day {weekend}</h5>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer components={['DateTimePicker']}>
               <DateTimePicker
                 label="Controlled picker"
                 value={dateValue}
                 onChange={(newValue) => setDateValue(newValue)}
               />
             </DemoContainer>
           </LocalizationProvider>
           <TableContainer component={Paper} style={{marginTop:"30px"}} >
                <Table className='borderTable' sx={{ Width: 500 }} aria-label="custom pagination table" >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Payment</StyledTableCell>
                      <StyledTableCell align="center">Project</StyledTableCell>
                      <StyledTableCell align="center">Study</StyledTableCell>
                      <StyledTableCell align="center">Extra</StyledTableCell>
                      <StyledTableCell align="center">Date</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? reportStatus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : reportStatus
                    )?.map((row:any, key: any) => (
                      <TableRow key={key} style={{border: "1px solid #ab9c5b"}}>
                        <StyledTableCell component="th" scope="row">
                          {row?.Username}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="left">
                          {row?.Payment}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="left">
                          {row?.Project}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="left">
                          {row?.Study}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="left">
                          {row?.Extra}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="left">
                          {row?.created_at}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows,border: "1px solid #ab9c5b" }}>
                        <StyledTableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow style={{border: "1px solid #ab9c5b"}}>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={6}
                        count={reportStatus.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        style={{border: "1px solid #ab9c5b"}}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    )
    
}

export default AdminReportStatusPage;