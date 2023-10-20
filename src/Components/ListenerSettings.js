import React from 'react'
import { TextField, Button, InputLabel, Grid, Box} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
export default function ListenerSettings() {

  const [httpsEnabled, setHttpsEnabled] = useState(false); 
  const [access_port, setAcessPort] = useState('');
  const [certificate_path, setCertificatePath] = useState('');
  const [certificate_key_password, setCertificateKeyPassword] = useState('');
  const [certificate_key_manager_password, setCertificateKeyManagerPassword] = useState('');
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

  return (
    
    <div>
    <link rel="stylesheet" href="Assets/css/style1.css" />
      <form>

         
         <div  className="margin-top">
          <Grid container spacing={3} alignItems="center" >
            <Grid item xs={4}>
              <InputLabel htmlFor="access-port">Certificate Path</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="Certificate Path"
                variant="outlined"
                fullWidth
               value={certificate_path}
              />
            </Grid>
          </Grid>
          </div> 
         <div  className="margin-top">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <InputLabel htmlFor="access-port">Certificate Key Password</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="Certificate Key Password"
                variant="outlined"
                type='password'
                fullWidth
                value={certificate_key_password}
              />
            </Grid>
          </Grid>
          </div>
         <div className="margin-top">
          <Grid container spacing={3} alignItems="center" >
            <Grid item xs={4}>
              <InputLabel htmlFor="access-port">Certificate Key Manager Password</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="Certificate Key Manager Password"
                variant="outlined"
                type='password'
                fullWidth
                value={certificate_key_manager_password}
              />
            </Grid>
          </Grid>
          </div>
        
        </form> 
    </div>
  )
}
