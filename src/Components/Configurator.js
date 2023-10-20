import React from 'react'
import SideBar from './SideBar'
import { Box } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid  from '@mui/material/Grid'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Configurator() {
  const centeredActionsStyle = {
    display: 'flex',
    justifyContent: 'center', 
  };
  const [cardData, setcardData] = useState([]);

  const navigate = useNavigate();

  const GoToIntegration = (id,connected_system_id_1, connected_system_id_2) => {
    
    navigate(`/integration/${id}/${connected_system_id_1}/${connected_system_id_2}`);
  };
////////////////get All the templates//////////////////
useEffect(() => {
  

  const config = {
    headers: {
      Authorization: localStorage.token,
      'Content-Type': 'application/json', 
    },
  };
  axios.get('/api/template/templates', config)
     .then((response) => {
       setcardData(response.data);
       
     })
    .catch((error) => {
       console.error('Error fetching data:', error);
     });
}, []); 


  return (
  <>
 
    <Box sx={{display: "flex",  justifyContent: 'center', marginTop:'100'}}>
      <h3>All templates:</h3>
    </Box>
      
   <Box sx={{display: "flex"}}>
   
    <SideBar/>
    
    <Grid container spacing={2}>
    {cardData.map((card) => (
     
      
  <Grid item xs={12} sm={6} md={4} key={card.id}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => GoToIntegration(card.id, card.connected_system_id_1, card.connected_system_id_2)} >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
         
          <div style={{ margin: '8px' }}>
            
            <img
              src={`/api/uploads/${card.image1}`} 
              alt={card.title}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </div>
          <div style={{ margin: '8px' }}>
          <ChevronRightOutlinedIcon
              style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '30px',
                color: 'grey', 
              }}
            />
            </div>
          <div style={{ margin: '8px' }}>
            <img
              src={`/api/uploads/${card.image2}`} 
              alt={card.title}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          </div>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary" style={centeredActionsStyle}>
            {card.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={centeredActionsStyle}>
       
        <Button size="small" color="primary" onClick={() => GoToIntegration(card.id, card.connected_system_id_1, card.connected_system_id_2)} >
          Load Templates
        </Button>
       
      </CardActions>
    </Card>
  </Grid>
))}

    </Grid>
    
    </Box>
  </>
  )
}
