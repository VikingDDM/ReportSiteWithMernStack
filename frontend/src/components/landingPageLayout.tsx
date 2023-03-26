import {Outlet} from 'react-router-dom';
import LandingPageHeader from './landingPageHeader';
import LandingPageSidebar from './landingPageSidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Layout = () => {
  return(
    <>
    <Box sx={{ display: 'flex' }}>
      <LandingPageHeader />
      <LandingPageSidebar />
      <Box
         component="main"
         sx={{
           backgroundColor: (theme) =>
             theme.palette.mode === 'light'
               ? theme.palette.grey[100]
               : theme.palette.grey[900],
           flexGrow: 1,
           minHeight: '100vh'
         }}
        >
          <Toolbar />
          <Outlet />
      </Box>
    </Box>
    </>
  )
}

export default Layout;