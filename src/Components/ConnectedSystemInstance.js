import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import SideBar from './SideBar';

export default function ConnectedSystemInstance() {
  const { systemId } = useParams();

  const [formData, setFormData] = useState({
    url: '',
    name: '',
  });

  const [urlValidity, setUrlValidity] = useState(true);
  const [connectionTested, setConnectionTested] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setUrlValidity(true);
    setConnectionTested(false);
  };

  const testUrlValidity = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.token,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(`/api/instance/check-url-validity?url=${formData.url}`, config);

      if (response.data.isValid) {
        setUrlValidity(true);
      } else {
        setUrlValidity(false);
      }
    } catch (error) {
      setUrlValidity(false);
    }

    
    setConnectionTested(true);
  };

  const handleTestConnection = async (e) => {
    e.preventDefault();
    await testUrlValidity();
  };

  const isCreateButtonDisabled = !urlValidity || !connectionTested;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlToTest = formData.url;

    const urlPattern = /^(http:\/\/|https:\/\/)/i;

    if (!urlPattern.test(urlToTest)) {
      window.alert('Invalid URL. Please enter a valid URL starting with http:// or https://');
      return;
    }

    await testUrlValidity();

    if (!urlValidity) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: localStorage.token,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(`/api/instance/create`, {
        systemId,
        url: urlToTest,
        name: formData.name,
      }, config);

      console.log('Instance created:', response.data);
    } catch (error) {
      console.error('Error creating instance:', error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Container maxWidth="lg">
          <Typography variant="h5" align="center" marginTop={10}>
            Create Instance
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="URL"
                  name="url"
                  fullWidth
                  variant="outlined"
                  value={formData.url}
                  onChange={handleChange}
                  required
                />
                {!urlValidity && (
                  <Typography variant="caption" color="error">
                    Invalid URL. Please enter a valid URL.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleTestConnection}
                >
                  Test Connection
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isCreateButtonDisabled}
                >
                  Create Instance
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </>
  );
}
