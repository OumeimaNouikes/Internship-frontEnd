import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';


import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LanIcon from '@mui/icons-material/Lan';
import LockIcon from '@mui/icons-material/Lock';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from 'react';
import { useState } from 'react';
 
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: 'blue',
  color: 'white',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
 
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  overflowX: 'hidden',
  backgroundColor: 'blue',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  backgroundColor:'white',
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const icons = [DashboardIcon, SettingsIcon, LanIcon, LockIcon, TroubleshootIcon, QueryStatsIcon]; 

const routes = ['/dashboard', '/configurator', '/connectedsystems', '/licenses', '/troubleshooting', '/dataexplorer'];
////

const SideBar = ({ setAuth }) => {  
    const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
    

    //////////////Reccuperation de nom//
  const [name, setName] = useState("");
 
  const getName = async () => {
    try {
      const response = await axios.get("/api/dashboard", {
        headers: { Authorization: localStorage.token }
      });
  
      const parseData = response.data;
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getName();
  }, []);

  /////////////LogOut/////////
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      
    } catch (err) {
      console.error(err.message);
    }
  };

  function toggleProfileMenu() {
    setProfileMenuOpen(!profileMenuOpen);
  }



  


    const navigate = useNavigate();
    const handleListItemClick = (index) => {
        navigate(routes[index]);
      };
     function handleOption1Click() {
      
        navigate('/settings'); 
      }
      function handleOption2Click() {
      
        navigate('/profile'); 
      }
     
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Configurator', 'Connected Systems', 'Licenses','Trouble Shooting','Data Explorer'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} >
              <ListItemButton
              onClick={() => handleListItemClick(index)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                   {React.createElement(icons[index % icons.length])}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <List>  
        <ListItem key="profile" disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      onClick={toggleProfileMenu}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary={open ? `Welcome ${name}` : name} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
  
  {profileMenuOpen && (
  <>
    <ListItem key="Option1" disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleOption1Click}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
       
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <ManageAccountsIcon /> 
        </ListItemIcon>
        <ListItemText primary=" General Settings" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
    <ListItem key="Option2" disablePadding sx={{ display: 'block' }}>
      <ListItemButton

        onClick={handleOption2Click}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          color: 'white',
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <LockIcon /> 
        </ListItemIcon>
        <ListItemText primary="User preferences" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
    <ListItem key="Option3" disablePadding sx={{ display: 'block' }}>
      <ListItemButton

        
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <LogoutIcon /> 
        </ListItemIcon>
        <ListItemText primary="Log out" sx={{ opacity: open ? 1 : 0 }} onClick={logout}/>
      </ListItemButton>
    </ListItem>
  </>
)}

</List>
      </Drawer>
      
    </Box>
  );
}
export default SideBar;