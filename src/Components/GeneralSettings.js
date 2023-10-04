import React, { useState } from 'react';
import {
  Grid,
  
 
} from '@mui/material';
import SideBar from './SideBar';
import SettingsList from './SettingsList';

const GeneralSettings = () => {
  

  return (
    <>
   <Grid container spacing={2}>
     
      <Grid item xs={3}>
        <SideBar />
      </Grid>

     
      <Grid item xs={9}>
        <SettingsList />
      </Grid>
    </Grid>
    </>
  );
};

export default GeneralSettings;
