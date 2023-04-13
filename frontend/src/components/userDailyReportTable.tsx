import * as React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import FullScreenLoader from './fullScreenLoader';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import UserDailyReportDeleteButton from './userDailyReportDeleteButton';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useGetUserDailyReportQuery } from '../redux/api/reportApi';
import UserDailyReportEditModal from './userDailyReportEditModal';
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
  
export interface ChildProps{
  setBtnAble: (btnAble: string) => void
}
   
function UserDailyReportTable(props: ChildProps) {
   
    const { isLoading, isError, error, data: userdailyreports } = useGetUserDailyReportQuery();

    const [dataid, setDataid] = React.useState("");
    const [dataPayment, setDataPayment] = React.useState("");
    const [dataProject, setDataProject] = React.useState("");
    const [dataStudy, setDataStudy] = React.useState("");
    const [dataExtra, setDataExtra] = React.useState("");
    const [show, setShow] = React.useState(false);
    let buttonAble : string;

    const handleShow = (data: any) => {setShow(true); 
                                       setDataid(data._id); 
                                       setDataPayment(data.Payment);
                                       setDataProject(data.Project);
                                       setDataStudy(data.Study);
                                       setDataExtra(data.Extra);} 
    const handleClose = () => {setShow(false);}
    useEffect(() => {
      
      if(userdailyreports !== undefined){
       if(userdailyreports[0].length > 0 || userdailyreports[3] === 0 || userdailyreports[3] === 6 || userdailyreports[2] <18){
        buttonAble = "none"
       } else{
        buttonAble = "block"
       }
       props.setBtnAble(buttonAble)
      }
    },[userdailyreports])

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
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { userdailyreports[0]?.map((row:any, key: any) => (
              <TableRow key={key} style={{border: "1px solid #ab9c5b"}}>
                <StyledTableCell style={{ width: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="center">
                  {userdailyreports[1].name}
                </StyledTableCell>
                <StyledTableCell style={{ maxWidth: 120,whiteSpace:"pre-wrap",wordBreak:"break-word" }} align="left">
                  {row?.Payment}
                </StyledTableCell>
                <StyledTableCell style={{ maxWidth: 120,whiteSpace:"pre-wrap",wordBreak:"break-word" }} align="left">
                  {row?.Project}
                </StyledTableCell>
                <StyledTableCell style={{ maxWidth: 120,whiteSpace:"pre-wrap",wordBreak:"break-word" }} align="left">
                  {row?.Study}
                </StyledTableCell>
                <StyledTableCell style={{ maxWidth: 120,whiteSpace:"pre-wrap",wordBreak:"break-word" }} align="left">
                  {row?.Extra}
                </StyledTableCell>
                <StyledTableCell style={{ width: 120,whiteSpace:"normal",wordBreak:"break-word" }} align="center">
                  {row?.created_at}
                </StyledTableCell>
                <StyledTableCell style={{ width: 120}} align="center">
                  <Button style={{minWidth:"unset"}} onClick={() => handleShow(row)} >
                    <BorderColorIcon style={{color:"dodgerblue"}} />
                  </Button>
                  
                  <UserDailyReportDeleteButton settingReportID={() => setDataid(row?._id) } report_id={dataid} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <UserDailyReportEditModal 
                  modalShow = {show} 
                  handleModalClose={handleClose}   
                  report_id = {dataid}
                  defaultValueA = {dataPayment} 
                  defaultValueB = {dataProject}
                  defaultValueC = {dataStudy} 
                  defaultValueD = {dataExtra}/>
      </TableContainer>
    );
  }

  export default UserDailyReportTable;
