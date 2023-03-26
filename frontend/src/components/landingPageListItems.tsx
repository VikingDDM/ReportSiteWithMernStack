import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import HelpIcon from '@mui/icons-material/Help';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import SavingsIcon from '@mui/icons-material/Savings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const UserListItems =() => { 
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
  const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);
  
  const handleClickA = () => {
    setOpenA(!openA);
  };
  const handleClickB = () => {
    setOpenB(!openB);
  };
  const handleClickC = () => {
    setOpenC(!openC);
  };
  
  return (
  <React.Fragment>
    <ListItemButton
      selected={selectedIndex === 0}
      onClick={(event) => {handleListItemClick(event, 0); navigate('/landing')}}
    >
      <ListItemIcon>
        <DashboardIcon style={{color:"lightslategrey"}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" style={{color:"lightslategrey"}}/>
    </ListItemButton>
    <ListItemButton onClick={handleClickA} >
        <ListItemIcon>
          <SummarizeIcon style={{color:"lightslategrey"}}/>
        </ListItemIcon>
        <ListItemText primary="Report" style={{color:"lightslategrey"}}/>
        {openA ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openA} timeout="auto" unmountOnExit>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 1}
          onClick={(event) => {handleListItemClick(event, 1); navigate('/landing/userDailyReport')}}
        >
          <ListItemIcon>
            <HistoryEduIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Daily Report" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 2}
          onClick={(event) => {handleListItemClick(event, 2); navigate('/landing/userWeeklyReport')}}
        >
          <ListItemIcon>
            <MenuBookIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Report Status" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
    </Collapse>
    <ListItemButton onClick={handleClickB}>
        <ListItemIcon>
          <AccountBalanceWalletIcon style={{color:"lightslategrey"}}/>
        </ListItemIcon>
        <ListItemText primary="Payment" style={{color:"lightslategrey"}}/>
        {openB ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openB} timeout="auto" unmountOnExit>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 3}
          onClick={(event) => {handleListItemClick(event, 3); navigate('/landing/userPaymentPlan')}}
        >
          <ListItemIcon>
            <RequestQuoteIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Payment Plan" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
    </Collapse>
    <ListItemButton onClick={handleClickC}>
        <ListItemIcon>
          <HelpIcon style={{color:"lightslategrey"}}/>
        </ListItemIcon>
        <ListItemText primary="Information" style={{color:"lightslategrey"}}/>
        {openC ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openC} timeout="auto" unmountOnExit>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 4}
          onClick={(event) => {handleListItemClick(event, 4); navigate('/landing/userPaymentInfo')}}
        >
          <ListItemIcon>
            <CurrencyExchangeIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Payment Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 5}
          onClick={(event) => {handleListItemClick(event, 5); navigate('/landing/userFreelancerInfo')}}
        >
          <ListItemIcon>
            <ContactPageIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Freelancer Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 6}
          onClick={(event) => {handleListItemClick(event, 6); navigate('/landing/userUpworkInfo')}}
        >
          <ListItemIcon>
            <AssignmentIndIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Upwork Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 7}
          onClick={(event) => {handleListItemClick(event, 7); navigate('/landing/userVPSInfo')}}
        >
          <ListItemIcon>
            <DesktopMacIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Vps Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 8}
          onClick={(event) => {handleListItemClick(event, 8); navigate('/landing/userPCInfo')}}
        >
          <ListItemIcon>
            <LaptopChromebookIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Pc Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
    </Collapse>
  </React.Fragment>
  );
}

const AdminListItems = () => { 
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
  const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  
  const handleClickA = () => {
    setOpenA(!openA);
  };
  const handleClickB = () => {
    setOpenB(!openB);
  };
  const handleClickC = () => {
    setOpenC(!openC);
  };
  const handleClickD = () => {
    setOpenD(!openD);
  };
  return(
  <React.Fragment>
    <ListItemButton
      selected={selectedIndex === 0}
      onClick={(event) => {handleListItemClick(event, 0); navigate('/landing')}}
    >
      <ListItemIcon>
        <AssignmentIcon style={{color:"lightslategrey"}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" style={{color:"lightslategrey"}}/>
    </ListItemButton>
    <ListItemButton onClick={handleClickA} >
       <ListItemIcon>
         <SummarizeIcon style={{color:"lightslategrey"}}/>
       </ListItemIcon>
       <ListItemText primary="Report" style={{color:"lightslategrey"}}/>
       {openA ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openA} timeout="auto" unmountOnExit>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 1}
          onClick={(event) => {handleListItemClick(event, 1); navigate('/landing/adminDailyReport')}}
        >
          <ListItemIcon>
            <HistoryEduIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Daily Report" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 2}
          onClick={(event) => {handleListItemClick(event, 2); navigate('/landing/adminReportStatus')}}
        >
          <ListItemIcon>
            <MenuBookIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Report Status" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
    </Collapse>
    <ListItemButton onClick={handleClickB} >
       <ListItemIcon>
         <AccountBalanceWalletIcon style={{color:"lightslategrey"}}/>
       </ListItemIcon>
       <ListItemText primary="Payment" style={{color:"lightslategrey"}}/>
       {openB ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openB} timeout="auto" unmountOnExit>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 3}
          onClick={(event) => {handleListItemClick(event, 3); navigate('/landing/adminPaymentStatus')}}
        >
          <ListItemIcon>
            <SavingsIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Payment Status" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 4}
          onClick={(event) => {handleListItemClick(event, 4); navigate('/landing/adminPaymentHistory')}}
        >
          <ListItemIcon>
            <PriceChangeIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Payment History" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
    </Collapse>
    <ListItemButton onClick={handleClickC}>
        <ListItemIcon>
          <HelpIcon style={{color:"lightslategrey"}}/>
        </ListItemIcon>
        <ListItemText primary="Information" style={{color:"lightslategrey"}}/>
        {openC ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openC} timeout="auto" unmountOnExit>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 5}
          onClick={(event) => {handleListItemClick(event, 5); navigate('/landing/adminPaymentInfo')}}
        >
          <ListItemIcon>
            <CurrencyExchangeIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Payment Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 6}
          onClick={(event) => {handleListItemClick(event, 6); navigate('/landing/adminFreelancerInfo')}}
        >
          <ListItemIcon>
            <ContactPageIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Freelancer Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 7}
          onClick={(event) => {handleListItemClick(event, 7); navigate('/landing/adminUpworkInfo')}}
        >
          <ListItemIcon>
            <AssignmentIndIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Upwork Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 8}
          onClick={(event) => {handleListItemClick(event, 8); navigate('/landing/adminVPSInfo')}}
        >
          <ListItemIcon>
            <DesktopMacIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Vps Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }}
          selected={selectedIndex === 9}
          onClick={(event) => {handleListItemClick(event, 9); navigate('/landing/adminPCInfo')}}
        >
          <ListItemIcon>
            <LaptopChromebookIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Pc Info" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
    </Collapse>
    <ListItemButton onClick={handleClickD} >
       <ListItemIcon>
         <SettingsApplicationsIcon style={{color:"lightslategrey"}}/>
       </ListItemIcon>
       <ListItemText primary="Setting" style={{color:"lightslategrey"}}/>
       {openD ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openD} timeout="auto" unmountOnExit>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 10}
          onClick={(event) => {handleListItemClick(event, 10); navigate('/landing/adminReportSetting')}}
        >
          <ListItemIcon>
            <SettingsBrightnessIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Report Setting" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 11}
          onClick={(event) => {handleListItemClick(event, 11); navigate('/landing/adminRollSetting')}}
        >
          <ListItemIcon>
            <PsychologyIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Role Management" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 12}
          onClick={(event) => {handleListItemClick(event, 12); navigate('/landing/adminPasswordSetting')}}
        >
          <ListItemIcon>
            <RoomPreferencesIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Reset Password" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
    </Collapse>
  </React.Fragment>
 );
}
 export {AdminListItems, UserListItems}