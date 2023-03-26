import * as React from 'react';
import { Container } from "@mui/system";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import FullScreenLoader from '../components/fullScreenLoader';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AdminPaymentStatusDeleteButton from '../components/adminPaymentStatusDeleteButton';
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
import { useGetMonthlyPayHistoryQuery } from '../redux/api/paymentApi';
import AdminPaymentStatusEditModal from '../components/adminPaymentStatusEditModal';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

const AdminPaymentHistoryPage = () => {
  const { isLoading, isError, error, data: payHistory } = useGetMonthlyPayHistoryQuery();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dataid, setDataid] = React.useState("");
  const [dataName, setDataName] = React.useState("");
  const [dataPayMothod, setDataPayMothod] = React.useState("");
  const [dataAmount, setDataAmount] = React.useState("");
  const [show, setShow] = React.useState(false);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payHistory?.length) : 0;
  const handleShow = (data: any) => {setShow(true); 
                                     setDataid(data._id); 
                                     setDataName(data.name);
                                     setDataPayMothod(data.paymentWay);
                                     setDataAmount(data.amount);} 
  const handleClose = () => {setShow(false);}
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

    return(
        <Container>
          <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>Payment History</h5>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label={'"month" and "year"'} views={['month', 'year']} />
            </DemoContainer>
          </LocalizationProvider>
          <TableContainer component={Paper} style={{marginTop:"30px"}} >
            <Table className='borderTable' sx={{ Width: 500 }} aria-label="custom pagination table" >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Payment Method</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? payHistory?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : payHistory
                )?.map((row:any, key: any) => (
                  <TableRow key={key} style={{border: "1px solid #ab9c5b"}}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 120,whiteSpace: "nowrap",textOverflow: "ellipsis",overflow: "hidden" }} align="left">
                      {row?.paymentWay}
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 120,whiteSpace: "nowrap",textOverflow: "ellipsis",overflow: "hidden" }} align="left">
                      {row?.amount}
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 120,whiteSpace: "nowrap",textOverflow: "ellipsis",overflow: "hidden" }} align="left">
                      {row?.created_at}
                    </StyledTableCell>
                    <StyledTableCell style={{ maxWidth: 120,whiteSpace: "nowrap",textOverflow: "ellipsis",overflow: "hidden" }} align="center">
                      <Button onClick={() => handleShow(row)} >
                        <BorderColorIcon style={{color:"dodgerblue"}} />
                      </Button>
                      
                      <AdminPaymentStatusDeleteButton settingPaymentID={() => setDataid(row?._id) } payment_id={dataid} />
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
                    colSpan={7}
                    count={payHistory?.length}
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
            <AdminPaymentStatusEditModal 
                      modalShow = {show} 
                      handleModalClose={handleClose}   
                      payHistory_id = {dataid}
                      defaultValueA = {dataName} 
                      defaultValueB = {dataPayMothod}
                      defaultValueC = {dataAmount} />
          </TableContainer>
        </Container>
    )
}

export default AdminPaymentHistoryPage;