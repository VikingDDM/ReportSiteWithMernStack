import {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { UserListItems }  from './landingPageListItems';
import { AdminListItems } from './landingPageListItems';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sidebaropening } from '../redux/features/sidebarActionSlice';
import { sidebaropen } from '../redux/selectors/sidebarActionSelector';
import { userApi } from "../redux/api/userApi";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
);


const LandingPageSidebar = () => {
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openstate, setOpenstate] = useState(true);
  const [userrole, setUserrole] = useState("");
  const opningstate = useAppSelector(sidebaropen);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    
    if(window.innerWidth > 885) {
      setOpenstate(true)
      dispatch(sidebaropening(true));
    } else if (window.innerWidth <= 885 ) {
      dispatch(sidebaropening(false));
      setOpenstate(false);
    }   

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    
  }, [window.innerWidth]);

  useEffect(() => {
    setOpenstate(opningstate)
  }, [opningstate])

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data!,
  });

  useEffect(() => {
      setUserrole(user?.role)
  }, [user?.role])

  return(
      <Drawer variant="permanent" open={openstate}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            px: [1],
          }}
        >
          <img src='/logo.png' width={90} height={40} style={{float:"right"}}></img>
        </Toolbar>
        <Divider />
        <List  style={{overflowX:'hidden',overflowY:'auto'}}>
          {userrole === "admin" && <AdminListItems />}
          {userrole === "user" && <UserListItems />}  
        </List>
      </Drawer>
  )
}

export default LandingPageSidebar;