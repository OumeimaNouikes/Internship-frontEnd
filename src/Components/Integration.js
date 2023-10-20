import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideBar from './SideBar';

export default function Integration() {
  
  const { id,connected_system_id_1, connected_system_id_2 } = useParams();

  const [system1Instances, setSystem1Instances] = useState([]);
  const [system2Instances, setSystem2Instances] = useState([]);
  const [selectedSystem1Instance, setSelectedSystem1Instance] = useState(null); 
  const [selectedSystem2Instance, setSelectedSystem2Instance] = useState(null); 
  const[integrationName, setIntegrationName]= useState('');
  const handleIntegrationNameChange = (event) => {
    setIntegrationName(event.target.value);
  };
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.token,
        'Content-Type': 'application/json', 
      },
    };
    axios
      .get(`/api/instance/system1-instances/${connected_system_id_1}`,config)
      .then((response) => {
        setSystem1Instances(response.data);
      })
      .catch((error) => {
        console.error('Error fetching System 1 instances:', error);
      });

    axios
      .get(`/api/instance/system2-instances/${connected_system_id_2}`,config)
      .then((response) => {
        setSystem2Instances(response.data);
      })
      .catch((error) => {
        console.error('Error fetching System 2 instances:', error);
      });
  }, [connected_system_id_1, connected_system_id_2]);

  const handleSystem1InstanceChange = (event) => {
    setSelectedSystem1Instance(event.target.value);
  };

  const handleSystem2InstanceChange = (event) => {
    setSelectedSystem2Instance(event.target.value);
  };
////////////////////Create integration////////////////////
  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.token,
        'Content-Type': 'application/json', 
      },
    };
   
    if (!selectedSystem1Instance || !selectedSystem2Instance) {
      
      return;
    }

    
    const integrationData = {
      name: integrationName, 
      template_id: id,
      system_instance_id_1: selectedSystem1Instance,
      system_instance_id_2: selectedSystem2Instance,
    };

    
    axios
      .post('/api/integration/create', integrationData,config)
      .then((response) => {
        toast.success('Integration created successfully!');
       
      })
      .catch((error) => {
        toast.error('Error creating integration. Please try again.');
      });
  };

  return (
    <>
     <div style={{ display: 'flex' }}>
    <SideBar/>
    <Container maxWidth="lg">
      <Typography variant="h5" align="center" marginTop={10}>
        Create Integration
      </Typography>
      <form onSubmit={handleSubmit}>
      
        <TextField
          fullWidth
          label="Integration Name"
          variant="outlined"
          margin="normal"
          value={integrationName}
          onChange={handleIntegrationNameChange} 
        />

        
        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
          style={{ flex: 1, marginRight: '16px' }}
        >
          <InputLabel>Select System 1 Instance</InputLabel>
          <Select
            value={selectedSystem1Instance || ''}
            onChange={handleSystem1InstanceChange}
            label="Select System 1 Instance"
          >
            <MenuItem value=""></MenuItem>
            {system1Instances.map((instance) => (
              <MenuItem key={instance.id} value={instance.id}>
                {instance.instance_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

       
        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
          style={{ flex: 1 }}
        >
          <InputLabel>Select System 2 Instance</InputLabel>
          <Select
            value={selectedSystem2Instance || ''}
            onChange={handleSystem2InstanceChange}
            label="Select System 2 Instance"
          >
            <MenuItem value=""></MenuItem>
            {system2Instances.map((instance) => (
              <MenuItem key={instance.id} value={instance.id}>
                {instance.instance_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <div style={{ marginBottom: '40px', marginTop: '20px', justifyContent: 'space-between' }}>
  <Button type="submit" variant="contained" color="primary" style={{ flex: 1, marginRight: '10px' }}>
    Save
  </Button>
  
</div>
      </form>
    </Container>
    </div>
  </>
  );
}
