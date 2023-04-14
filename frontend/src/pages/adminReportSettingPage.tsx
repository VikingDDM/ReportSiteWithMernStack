import { Container } from "@mui/system"
import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import FullScreenLoader from '../components/fullScreenLoader';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useGetServerTimeZoneQuery } from '../redux/api/userApi';
import AdminTimezoneInfoEditModal from '../components/adminTimezoneEditModal';
import Button from '@mui/material/Button';

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

const AdminReportSettingPage = () => {
    const { isLoading, isError, error, data: timezone } = useGetServerTimeZoneQuery();
    const [dataid, setDataid] = React.useState("");
    const [dataTimezone, setDataTimezone] = React.useState("");
    const [show, setShow] = React.useState(false);

    const handleShow = () => {setShow(true); 
                              setDataid(timezone._id); 
                              setDataTimezone(timezone.serverTimezone);
                              } 
    const handleClose = () => {setShow(false);}
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
            <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>Server Timezone</h5>
            <TableContainer component={Paper} style={{marginTop:"30px"}} >
        <Table className='borderTable' sx={{ Width: 500 }} aria-label="custom pagination table" >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Server Timezone</StyledTableCell>
              
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow  style={{border: "1px solid #ab9c5b"}}>
                <StyledTableCell style={{ width: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="center">
                  UTC {timezone.serverTimezone}
                </StyledTableCell>
                <StyledTableCell style={{ width: 120}} align="center">
                  <Button style={{minWidth:"unset"}} onClick={() => handleShow()} >
                    <BorderColorIcon style={{color:"dodgerblue"}} />
                  </Button>
                  
                </StyledTableCell>
              </TableRow>
            
          </TableBody>
        </Table>
        <AdminTimezoneInfoEditModal 
                  modalShow = {show} 
                  handleModalClose={handleClose}   
                  timezoneInfo_id = {dataid}
                  defaultValueA = {dataTimezone} 
        />
      </TableContainer>
        </Container>
    )
}

export default AdminReportSettingPage;