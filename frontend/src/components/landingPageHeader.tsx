import React, {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSignoutUserMutation } from '../redux/api/authApi';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { sidebaropening } from '../redux/features/sidebarActionSlice';
import { sidebaropen } from '../redux/selectors/sidebarActionSelector';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Divider from '@mui/material/Divider';
import {user} from '../redux/selectors/userSelector';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
  
const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const LandingPageHeader = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useSignoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/';
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  const dispatch = useAppDispatch(); 
  const opningstate = useAppSelector(sidebaropen);
  const reportUser = useAppSelector(user);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [csspropdraw, setCsspropdraw] = useState("none");

  const handleOpen = () => {
    dispatch(sidebaropening(!opningstate))
  }


  useEffect(() => {
        
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    if(window.innerWidth<=885) {
        setCsspropdraw("block");
    } else {
        setCsspropdraw("none");
    }
  }, [window.innerWidth])

  return(
    <AppBar position="absolute" open={opningstate} style={{backgroundColor:"cadetblue"}}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpen}
          edge="start"
          style={{marginTop:"5px", marginLeft:"7px"}}
        >
          <MenuIcon style={{display:csspropdraw}}/>
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Hello, {reportUser?.name}!
        </Typography>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
          <PersonOutlineIcon  style={{color:"white", fontSize:"40"}}/>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        > 
          <Divider />
          <MenuItem onClick={onLogoutHandler}>Signout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default LandingPageHeader;

  