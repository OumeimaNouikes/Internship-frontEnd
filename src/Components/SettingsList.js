import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import WebConsole from './WebConsole';
import PlatformSettings from './PlatformSettings';
import ListenerSettings from './ListenerSettings';
import {Container} from '@mui/material';
export default function SettingsList() {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
    
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        style={{ padding: '50px' }}
      >
        {value === index && (
          <Box >
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <>
    <Grid container spacing={2}>
      
    <Grid item xs={3} container spacing={3}>
      
    
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 100 , paddingTop: '90px' }}
    >
       <Grid item xs={5}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider',width: '300px', }}
      >  
        <Tab label="Web Console" {...a11yProps(0)} />
        
        <Tab label="Platform" {...a11yProps(1)} />
        <Tab label="Debug" {...a11yProps(2)} />
        <Tab label="Download support file" {...a11yProps(3)} />
        <Tab label="Listener" {...a11yProps(4)} />
       
      </Tabs>
      </Grid> 
      </Box>
     
      </Grid>
     
      <Grid item xs={9} container spacing={3}>
      <TabPanel value={value} index={0}>
             <WebConsole/>
  </TabPanel>
      <TabPanel value={value} index={1}>
               <PlatformSettings/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
               troubleshooting
       </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div>
        Item Four
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
       <ListenerSettings/>
      </TabPanel>
     
      </Grid>
     
  
    </Grid>
    </> 
  );
}
