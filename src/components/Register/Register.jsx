import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const Register = () => {
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm" style={{marginTop:"15vh"}}>
    <TextField id="outlined-basic" label="First Name" variant="outlined" />
    <br/><br/>
    <TextField id="outlined-basic" label="Last Name" variant="outlined" />
    <br/><br/>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <br/><br/>
        <TextField id="outlined-basic" label="Password" variant="outlined" />

        <br/><br/>
        <TextField id="outlined-basic" label="Phone" variant="outlined" />
        <br/><br/>
        <Button variant="contained" size ="large">Sign In </Button>
    </Container>
  </React.Fragment>
  )
}

export default Register