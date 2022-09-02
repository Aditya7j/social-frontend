import * as React from 'react';
import Box from '@mui/material/Box';
import Box1 from '@mui/material/Box';
import Homenav from '../HomeNav/Homenav';
import Postcard from '../Postcard/Postcard';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const Home = () => {
  return (
    
    <>
    <Homenav/>
      <Box style={{display:"flex",width: "100%",height: "100vh",
       border:"1px solid black",justifyContent:"space-evenly"}}>
          <Box1 style={{ width:"20%",height:"100vh",border:"1px solid red"}}></Box1>
          <Box1 style={{ width:"50%",height:"100vh",border:"1px solid red"}}>
            <Box>
            <TextField
          id="filled-multiline-static"
          label="What's in your mind"
          multiline
          rows={5}
          fullWidth={true}
          variant="filled"
        />
        <Box style={{display:"flex",justifyContent:"flex-end",marginBottom:"5vh"}}>
        <Button variant="text" align="right">POST</Button>
        </Box>
          
            </Box>
            <Postcard/>
          </Box1>
          <Box1 style={{ width:"21%",height:"100vh",border:"1px solid red"}}></Box1>
      </Box>
      
    
    </>
   
  )
}

export default Home