import React from 'react'
import SideBar from './SideBar'
import { Box } from '@mui/material'
import Grid  from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DnsIcon from '@mui/icons-material/Dns';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Dashboard = ({ }) => {

  const centerButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
  };
  const [integrationCount, setIntegrationCount] = useState(0);
  const [instanceCount, setinstanceount] = useState(0);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.token,
        'Content-Type': 'application/json', 
      },
    };
    axios
      .get('/api/integration/count',config)
      .then((response) => {
        setIntegrationCount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching integration count:', error);
      });

   
  },);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.token,
        'Content-Type': 'application/json', 
      },
    };
    axios
      .get('/api/instance/count',config)
      .then((response) => {
        setinstanceount(response.data.count);
      })
      .catch((error) => {
        console.error('Error fetching integration count:', error);
      });

   
  },);
  return (
    <>
  
    <Box sx={{display: "flex"}}>
    <SideBar/>
    <Grid container spacing={4} columns={16}>
  <Grid item xs={4}>
    <Card>
  <CardContent>
  <CardMedia
      component="div" 
      height="500"
    >
      <Icon style={{ color: 'blue' }}>
        <LocalPoliceIcon /> 
      </Icon>
    </CardMedia>
          <Typography gutterBottom variant="h5" component="div">
            0 Of 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Active Licenses
          </Typography>
        </CardContent>
        </Card>
  </Grid>
  <Grid item xs={4}>
  <Card>
  <CardMedia
      component="div" 
      height="500"
    >
      <Icon style={{ color: 'Blue' }}>
        <AccountTreeIcon /> 
      </Icon>
    </CardMedia>
  <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {integrationCount} Of {integrationCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Active Integrations
          </Typography>
        </CardContent>
        </Card>
  </Grid>
  <Grid item xs={4}>
  <Card>
  <CardMedia
      component="div" 
      height="500"
    >
      <Icon style={{ color: 'blue' }}>
        <DnsIcon /> 
      </Icon >
    </CardMedia>
  <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {instanceCount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Connected Systems
          </Typography>
        </CardContent>
        </Card>
  </Grid>
  <Grid item xs={4}>
  <Card>
  <CardMedia
      component="div" 
      height="500"
    >
      <Icon style={{ color: 'blue' }}>
        <MonitorHeartIcon /> 
      </Icon>
    </CardMedia>
  <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Good
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Health Status
          
          </Typography>
        </CardContent>
        </Card>
  </Grid>
</Grid>

    </Box>
  
    </>
  )
}
export default Dashboard;