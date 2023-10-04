import React from 'react'
import { TextField, Button, InputLabel, Grid,} from '@mui/material';
export default function PlatformSettings() {
  return (
    <div>
       <link rel="stylesheet" href="Assets/css/style1.css" />
        <form>
      
        <div  className="margin-top">   
      <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <InputLabel htmlFor="HTTP timeout">HTTP timeout</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="HTTP timeout"
                variant="outlined"
                fullWidth
               
              />
            </Grid>
          </Grid>
          </div>
          <div  className="margin-top">
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={4}>
              <InputLabel htmlFor="Action timeout">Action timeout</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="Action timeout"
                variant="outlined"
                fullWidth
                
              />
            </Grid>
          </Grid>
          </div>
          <div  className="margin-top">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <InputLabel htmlFor="Session timeout">Session timeout</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="Session timeout"
                variant="outlined"
                fullWidth
                // Add value and onChange handlers as needed
              />
            </Grid>
          </Grid>
          </div>
          <div  className="margin-top">
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={4}>
              <InputLabel htmlFor="Heap Size">Heap Size</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="Heap Size"
                variant="outlined"
                
                fullWidth
                
              />
            </Grid>
          </Grid>
          </div>
         
         
        </form> 
    </div>
  )
}
