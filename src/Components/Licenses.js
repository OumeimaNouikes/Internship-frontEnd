import React, { useState } from 'react'
import SideBar from './SideBar'
import { Box } from '@mui/material'
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import axios from 'axios';
export default function Licenses() {


  const [file,setFile]= useState(null);
  const [progress,setProgress]= useState({started: false, pc:0});
  const [msg,setMsg]= useState(null);

  function handleUpload(){
    if(!file){
     setMsg("no file selected");
      return;
    }
    const fd=new FormData();
    fd.append('file',file);
    setMsg("Uploading..");
    setProgress(prevState =>{
      return{...prevState,started:true}
    })
    axios.post('http://httpbin.org/post',fd,{
      onUploadProgress: (ProgressEvent)=>{setProgress(prevState =>{
        return{...prevState,pc:ProgressEvent.progress*100}
      })},
      headers:{
        "Custom-Header":"value",
      }
    })
    .then(res =>{
      setMsg("Upload Done");
      console.log(res.data)
    })
    .catch(err=> {
      setMsg("Upload Failed");
      console.error(err)});

  }
  return (
    <div>
      <>
      <Box sx={{ display: 'flex',  justifyContent: 'center', padding: '100px' }}>
     
      <Input onChange ={(e)=>{setFile(e.target.files[0])}}    color="secondary" type='file' />
      
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload</Button>
      <Box sx={{ mt: 2 }}>
      {progress.started &&  
        <progress max="100" value ={progress.pc}></progress>
       }
      {msg && <span>{msg}</span>}
      </Box> 
    </Box>
  <Box sx={{display: "flex"}}>
  
  <SideBar/>
 
  </Box>
  </>
    </div>
  )
}
