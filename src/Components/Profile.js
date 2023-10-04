import { TextField, Button, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Grid  from '@mui/material/Grid'
const Profile = ({ setAuth }) => { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [message, setMessage] = useState('');
    const [passEmail, setPassEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
  const [user_id, setUserId] = useState('');
  const [isPasswordResetting, setIsPasswordResetting] = useState(false); 

  const handleChangePasswordd = () => {
    setIsPasswordResetting(true);
  };

  const handleCancelPasswordReset = () => {
    setIsPasswordResetting(false);
  };
    useEffect(() => {
      

        ///////////////////////////////////Get Profile///////////////
        const fetchProfileData = async () => {
            try {
              const config = {
                headers: {
                  Authorization: localStorage.token,
                  'Content-Type': 'application/json', 
                },
              };
          
              const response = await axios.get('http://localhost:8000/user/profile', config);
              const userData = response.data;
              console.log(userData);
              setUserId (userData.user_id);
              setName(userData.user_name);
              setEmail(userData.user_email);
              setCountry(userData.country);
              setState(userData.state);
            } catch (error) {
              console.error('Error fetching profile data:', error);
            }
          };
          
          fetchProfileData();
          }, []);

          
  ///////////////////Update Profile/////////////////////////
    const handleSaveProfile = async () => {
      try {
        const config = {
            headers: {
              Authorization: localStorage.token,
              'Content-Type': 'application/json', 
            },
          };
       
        const response = await axios.put(`http://localhost:8000/user/${user_id}`, {
         
        user_name: name,
        user_email: email,
          country,
          state,
        },config);
  
        
        setMessage('Profile updated successfully');
        setIsEditing(false);
      } catch (error) {
      
        setMessage('Failed to update profile. Please try again.');
      }
    };


    /////////////////////Password RESet////////////////////
    const handleChangePassword = async () => {
        try {
         
          
          const config = {
            headers: {
              Authorization: localStorage.token,
              'Content-Type': 'application/json', 
            },
          };
          const requestBody = {
            password: password,
            user_email: passEmail,
          };
          
          const response = await axios.post(
            'http://localhost:8000/user/password-reset',
            requestBody , config
          );
    
         
          if (response.status === 200) {
            setMessage('Password changed successfully');
          } else {
            setMessage('Failed to change password');
          }
        } catch (error) {
          console.error('Error:', error);
          setMessage('Failed to change password. Please try again.');
        }
      };
    
    return(
        <>
        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
  <SideBar/>
  <Box display="flex" justifyContent="center" alignItems="center" padding="80px">
  <form style={{ width: "80%" }}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Country"
          variant="outlined"
          fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          value={state}
          size="large"
          onChange={(e) => setState(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <div style={{ marginBottom: '40px', marginTop: '20px' }}>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleSaveProfile} style={{ marginRight: '10px' }} >
              Save
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}  style={{ marginRight: '10px' }} >
              Edit
            </Button>
          )}
          <Button variant="contained" color="primary"  style={{ marginLeft: '10px' }} onClick={handleChangePasswordd}>
            Change Password
          </Button>
        </div>
      </Grid>
      {message && <div>{message}</div>}
      <Grid item xs={12}>
        {isPasswordResetting && (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  onChange={(e) => setPassEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <div style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Button
                 variant="contained"
                 color="primary"
                 onClick={handleChangePassword}
                  style={{ marginRight: '10px' }} 
                            >
                   Reset Password
              </Button>
            <Button
                 variant="contained"
                color="primary"
                onClick={handleCancelPasswordReset}
                 style={{ marginLeft: '10px' }} 
            >
             Cancel
             </Button>
             </div>
          </div>
        )}
      </Grid>
    </Grid>
  </form>
</Box>

</div>
</>

    );
}




export default Profile;