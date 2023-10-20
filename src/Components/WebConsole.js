import React from 'react'
import { TextField, Button, InputLabel, Grid,Switch, FormControlLabel,} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Container} from '@mui/material';
export default function WebConsole() {
    const [httpsEnabled, setHttpsEnabled] = useState(false); 
    const [access_port, setAcessPort] = useState('');
    const [certificate_path, setCertificatePath] = useState('');
    const [certificate_key_password, setCertificateKeyPassword] = useState('');
    const [certificate_key_manager_password, setCertificateKeyManagerPassword] = useState('');
   
  const handleHttpsToggle = () => {
    setHttpsEnabled(!httpsEnabled);
  };

  ///////////////////////////////////Get web console data///////////////
  useEffect(() => {
      
    const currentURL = window.location.href;
          const url = new URL(currentURL);
          const port = url.port;
    const fetchWebData = async () => {
        try {
          const config = {
            headers: {
              Authorization: localStorage.token,
              'Content-Type': 'application/json', 
              'Access-Port': port,
            },
          };
      
          const response = await axios.get('/api/settings/web', config);
          const webData = response.data;
         
          setAcessPort (port);
          setHttpsEnabled(webData.https_enabled);
          setCertificatePath(webData.certificate_path);
          setCertificateKeyPassword(webData.certificate_key_password);
          setCertificateKeyManagerPassword(webData.certificate_key_manager_password);
         
        } catch (error) {
          console.error('Error fetching web console data:', error);
        }
      };
      
      fetchWebData();
      }, []);

       ///////////////////Update settings/////////////////////////
    const updateSettings = async () => {
      try {
        const currentURL = window.location.href;
        const url = new URL(currentURL);
        const port = url.port;
        const config = {
          headers: {
            Authorization: localStorage.token,
            'Content-Type': 'application/json', 
            'Access-Port': port,
          },
        };
       
        const response = await axios.put(`/api/settings/update`, {
          https_enabled:httpsEnabled,
          certificate_path,
          certificate_key_password,
          certificate_key_manager_password,

        
        },config); 
        alert('Settings updated successfully');
      } catch (error) {
       
        console.error('Error updating web console data:', error);
        alert('Settings error in updating');
      }
    };
  return (
    <div>
      <link rel="stylesheet" href="Assets/css/style1.css" />
      
      <Container maxWidth="lg">
      <form >
      
      <div  className="margin-top"> 
      <Grid container spacing={2} alignItems="center">
            <Grid item xs={7}>
              <InputLabel htmlFor="access-port">Access Port</InputLabel>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="access-port"
                variant="outlined"
                fullWidth
                value={access_port}
              />
            </Grid>
          </Grid>
          </div>
          <div  className="margin-top"> 
          <Grid container spacing={2} alignItems="center" >
          <Grid item xs={7}>
              <InputLabel htmlFor="access-port">HTTPS</InputLabel>
            </Grid>
          <Grid item xs={5}>
            <FormControlLabel
              control={
                <Switch
                id="https-switch"
                checked={httpsEnabled}
                onChange={handleHttpsToggle}
                color="primary"
              />
              }
              
            />
          </Grid>
        </Grid>
        </div>
        {httpsEnabled && (
          
          <div>
          <div  className="margin-top">
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={7}>
              <InputLabel htmlFor="Certificate Path">Certificate Path</InputLabel>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="Certificate Path"
                variant="outlined"
                fullWidth
               value={certificate_path}
               onChange={(e) => setCertificatePath(e.target.value)}
              />
            </Grid>
          </Grid>
          </div>
          <div  className="margin-top"> 
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={7}>
              <InputLabel htmlFor="Certificate Key Password">Certificate Key Password</InputLabel>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="Certificate Key Password"
                variant="outlined"
                type='password'
                fullWidth
                value={certificate_key_password}
                onChange={(e) => setCertificateKeyPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          </div>
          <div  className="margin-top"> 
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={7}>
              <InputLabel htmlFor="Certificate Key Manager Password">Certificate Key Manager Password</InputLabel>
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="Certificate Key Manager Password"
                variant="outlined"
                type='password'
                fullWidth
               value={certificate_key_manager_password}
               onChange={(e) => setCertificateKeyManagerPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          </div>
          </div>
        )}
         <div className='margin-top'  style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" type="submit" onClick={updateSettings} >
            Submit
          </Button>
          </div>
        </form>
      </Container>
        </div>
  )
}
