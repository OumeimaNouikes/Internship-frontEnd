import React from 'react'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import SideBar from './SideBar';
import { useEffect } from 'react';
import { Box  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
const avatarStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
};
export default function ConnectedSystems() {

  const [cardData, setcardData] = useState([]);


  ////////////////get All the connected systems//////////////////
useEffect(() => {
  

  const config = {
    headers: {
      Authorization: localStorage.token,
      'Content-Type': 'application/json', 
    },
  };
  axios.get('/api/systems/connectedsystems', config)
     .then((response) => {
       setcardData(response.data);
       
     })
    .catch((error) => {
       console.error('Error fetching data:', error);
     });
}, []); 
const navigate = useNavigate();

const GoToInstance = (systemId) => {
  
  navigate(`/instance/${systemId}`); 
};



  return (
   
    <>
  <Box sx={{ display: "flex", justifyContent: 'center' }}>
    <h3>All Connected systems:</h3>
  </Box>
  <Box sx={{ display: "flex" }}>
    <SideBar />
    <Container maxWidth="lg">
    <List style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "-5px", padding: "0" }}>
      {cardData.map((system) => (
        <ListItem key={system.id} style={{ flex: "0 0 calc(33.33% - 20px)", margin: "5px", padding: "0" }}>
          <ListItemAvatar style={{ textAlign: "center" }}>
            <Avatar alt={system.name} src={`/api/uploads/${system.image}`} sx={avatarStyle} onClick={() => GoToInstance(system.id)}>
              <ImageIcon />
            </Avatar>
            <ListItemText primary={system.name} style={{ marginTop: "8px" }} />
          </ListItemAvatar>
        </ListItem>
      ))}
    </List>
    </Container>
  </Box>
    </>
  )
}
