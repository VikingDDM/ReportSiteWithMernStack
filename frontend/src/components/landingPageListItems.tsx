import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation(); 

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

  React.useEffect(() => {
    if(location?.pathname === "/user/landing") {
      setSelectedIndex(0);
    } else if(location?.pathname === "/user/dailyReport" || location?.pathname === "/user/weeklyReport") {
      setOpenA(true)
      if(location?.pathname === "/user/dailyReport"){setSelectedIndex(1);}
      if(location?.pathname === "/user/weeklyReport"){setSelectedIndex(2);}
    } else if (location?.pathname === "/user/paymentPlan") {
      setOpenB(true)
      setSelectedIndex(3);
    } else if (location?.pathname === "/user/paymentInfo" ||
               location?.pathname === "/user/freelancerInfo" ||
               location?.pathname === "/user/upworkInfo" ||
               location?.pathname === "/user/vpsInfo" ||
               location?.pathname === "/user/pcInfo" 
    ) {
      setOpenC(true);
      if(location?.pathname === "/user/paymentInfo"){setSelectedIndex(4);}
      if(location?.pathname === "/user/freelancerInfo"){setSelectedIndex(5);}
      if(location?.pathname === "/user/upworkInfo"){setSelectedIndex(6);}
      if(location?.pathname === "/user/vpsInfo"){setSelectedIndex(7);}
      if(location?.pathname === "/user/pcInfo"){setSelectedIndex(8);}
    }
  }, [location?.pathname])
  
  return (
  <React.Fragment>
    <ListItemButton
      selected={selectedIndex === 0}
      onClick={(event) => {handleListItemClick(event, 0); navigate('/user/landing')}}
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
          onClick={(event) => {handleListItemClick(event, 1); navigate('/user/dailyReport')}}
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
          onClick={(event) => {handleListItemClick(event, 2); navigate('/user/weeklyReport')}}
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
          onClick={(event) => {handleListItemClick(event, 3); navigate('/user/paymentPlan')}}
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
          onClick={(event) => {handleListItemClick(event, 4); navigate('/user/paymentInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 5); navigate('/user/freelancerInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 6); navigate('/user/upworkInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 7); navigate('/user/vpsInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 8); navigate('/user/pcInfo')}}
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
  const location = useLocation();

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

  React.useEffect(() => {
    if(location?.pathname === "/admin/landing") {
      setSelectedIndex(0);
    } else if(location?.pathname === "/admin/dailyReport" || location?.pathname === "/admin/reportStatus") {
      setOpenA(true)
      if(location?.pathname === "/admin/dailyReport"){setSelectedIndex(1);}
      if(location?.pathname === "/admin/reportStatus"){setSelectedIndex(2);}
    } else if (location?.pathname === "/admin/paymentStatus" || location?.pathname === "/admin/paymentHistory") {
      setOpenB(true)
      if(location?.pathname === "/admin/paymentStatus"){setSelectedIndex(3);}
      if(location?.pathname === "/admin/paymentHistory"){setSelectedIndex(4);}
    } else if (location?.pathname === "/admin/paymentInfo" ||
               location?.pathname === "/admin/freelancerInfo" ||
               location?.pathname === "/admin/upworkInfo" ||
               location?.pathname === "/admin/vpsInfo" ||
               location?.pathname === "/admin/pcInfo" 
    ) {
      setOpenC(true)
      if(location?.pathname === "/admin/paymentInfo"){setSelectedIndex(5);}
      if(location?.pathname === "/admin/freelancerInfo"){setSelectedIndex(6);}
      if(location?.pathname === "/admin/upworkInfo"){setSelectedIndex(7);}
      if(location?.pathname === "/admin/vpsInfo"){setSelectedIndex(8);}
      if(location?.pathname === "/admin/pcInfo"){setSelectedIndex(9);}
    } else if (location?.pathname === "/admin/reportSetting" ||
    location?.pathname === "/admin/roleSetting" ||  
    location?.pathname === "/admin/passwordSetting"   
    ) {
      setOpenD(true)
      if(location?.pathname === "/admin/reportSetting"){setSelectedIndex(10);}
      if(location?.pathname === "/admin/roleSetting"){setSelectedIndex(11);}
      if(location?.pathname === "/admin/passwordSetting"){setSelectedIndex(12);}
    }
  }, [location?.pathname])

  return(
  <React.Fragment>
    <ListItemButton
      selected={selectedIndex === 0}
      onClick={(event) => {handleListItemClick(event, 0); navigate('/admin/landing')}}
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
          onClick={(event) => {handleListItemClick(event, 1); navigate('/admin/dailyReport')}}
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
          onClick={(event) => {handleListItemClick(event, 2); navigate('/admin/reportStatus')}}
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
          onClick={(event) => {handleListItemClick(event, 3); navigate('/admin/paymentStatus')}}
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
          onClick={(event) => {handleListItemClick(event, 4); navigate('/admin/paymentHistory')}}
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
          onClick={(event) => {handleListItemClick(event, 5); navigate('/admin/paymentInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 6); navigate('/admin/freelancerInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 7); navigate('/admin/upworkInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 8); navigate('/admin/vpsInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 9); navigate('/admin/pcInfo')}}
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
          onClick={(event) => {handleListItemClick(event, 10); navigate('/admin/reportSetting')}}
        >
          <ListItemIcon>
            <SettingsBrightnessIcon style={{color:"lightslategrey"}}/>
          </ListItemIcon>
          <ListItemText primary="Server Timezone" style={{color:"lightslategrey"}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component="div" disablePadding>
        <ListItemButton 
          sx={{ pl: 4 }} 
          selected={selectedIndex === 11}
          onClick={(event) => {handleListItemClick(event, 11); navigate('/admin/roleSetting')}}
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
          onClick={(event) => {handleListItemClick(event, 12); navigate('/admin/passwordSetting')}}
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