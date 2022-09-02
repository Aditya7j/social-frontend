import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { url } from '../../Url/url';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const Register = () => {

  const [buttonDisabler,setButtondisabler] =useState(true);
  const [showAlert,setShowalert] = useState(false);
  const [showError,setShowerror] = useState("");

  const navigate = useNavigate();

  const [data,setData] =useState({
    firstName :"",
    lastName :"",
    email:"",
    password:"",
    phone: 0,
  })

  const handlechange =(e)=>{
    setData({...data,[e.target.id]:e.target.value})
    if(data.firstName.length!==0 && data.lastName.length!==0 && data.email.length!==0 && data.password.length!==0){
      setButtondisabler(false)
    }
  }

  const handleSubmit = ()=>{
    fetch(`${url}/register`,{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "content-type":"application/json"
      }
    }).then((res)=>{
      res.json().then((res)=>{
        if(res.message==="User created successfully"){
          navigate("/login")
          return;
        }
        else{
          setShowerror(res.message)
          handleAlert()
        }
        console.log(res)
        
      }).catch((err)=>{
          setShowerror("Something Went Wrong")
      })
    })
  }

  const handleAlert =()=>{
      setShowalert(true)
      removeAlert()
  }

  const removeAlert = ()=>{
    setTimeout(()=>{
        setShowalert(false)
    },3000)
  }
  return (
    
    <React.Fragment>
      <Navbar/>
    <CssBaseline />
    <Container maxWidth="sm" style={{marginTop:"15vh"}}>
    {showAlert && <><Alert severity="error">{showError}</Alert> <br /></>} 
    <TextField  onChange={handlechange}  id="firstName" label="First Name" variant="outlined" />
    <br/><br/>
    <TextField onChange={handlechange} id="lastName" label="Last Name" variant="outlined" />
    <br/><br/>
    <TextField autoComplete='off' onChange={handlechange} id="email" label="Email" variant="outlined" type="email" />
      <br/><br/>
    <TextField autoComplete='off' onChange={handlechange} id="password" label="Password" variant="outlined" type="password"  />
    <br/><br/>
    <TextField onChange={handlechange} id="phone" label="Phone" variant="outlined" type="number" />
    <br/><br/>
    <Button disabled={buttonDisabler} onClick={handleSubmit} variant="contained" size ="large">Sign In </Button>
    </Container>
  </React.Fragment>
  
  )
}

export default Register