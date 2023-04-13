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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AdminUserDeleteButton from '../components/adminUserDeleteButton';
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
import { useGetAllUsersQuery } from '../redux/api/userApi';
import AdminRoleEditModal from '../components/adminRoleEditModal';
import Button from '@mui/material/Button';
import {user} from '../redux/selectors/userSelector';
import { useAppSelector } from "../redux/hooks";

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

const AdminRoleSettingPage = () => {
    const adminUser = useAppSelector(user);
    const { isLoading, isError, error, data: users } = useGetAllUsersQuery();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dataid, setDataid] = React.useState("");
    const [dataRole, setDataRole] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [delButtonOpt, setDelButtonOpt] = React.useState("inlineBlock");
    const [tableUser, setTableUser] = React.useState([]);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableUser?.length) : 0;

    const handleShow = (data: any) => {setShow(true); 
                                       setDataid(data._id); 
                                       setDataRole(data.role);
                                      } 
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
      let userNum = 0;
      let realUser:any = [];
      users?.map((user:any) => {
        if(user.role === 'user'){userNum++}
        if(user.email !== adminUser.email){
          realUser.push(user)
        }
      })
      setTableUser(realUser);
      if(userNum===1){setDelButtonOpt('none')}
    },[users])

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
        <Container maxWidth={false}>
            <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>Role Management</h5>
            <TableContainer component={Paper} style={{marginTop:"30px"}} >
                <Table className='borderTable' sx={{ Width: 500 }} aria-label="custom pagination table" >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Email</StyledTableCell>
                      <StyledTableCell align="center">Role</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? tableUser?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : tableUser
                    )?.map((row:any, key: any) => (
                      <TableRow key={key} style={{border: "1px solid #ab9c5b"}}>
                        <StyledTableCell style={{ width: 200,whiteSpace:"normal",wordBreak:"break-word" }} align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="center">
                          {row?.email}
                        </StyledTableCell>
                        <StyledTableCell style={{ maxWidth: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="center">
                          {row?.role}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 120}} align="center">
                          <Button style={{minWidth:"unset"}} onClick={() => handleShow(row)} >
                            <BorderColorIcon style={{color:"dodgerblue"}} />
                          </Button>
                          
                          <AdminUserDeleteButton info_id={row?._id} buttonStyle={delButtonOpt}/>
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
                        count={tableUser?.length}
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
                <AdminRoleEditModal 
                      modalShow = {show} 
                      handleModalClose={handleClose}   
                      roleinfo_id = {dataid}
                      defaultValueA = {dataRole} />
            </TableContainer>
        </Container>
    )
}

export default AdminRoleSettingPage;