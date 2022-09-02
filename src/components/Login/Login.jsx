import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { url } from '../../Url/url';
import Alert from '@mui/material/Alert';

const Login = () => {
  const [buttonDisabler,setButtondisabler] =useState(true);
  const [showAlert,setShowalert] = useState(false);
  const [showError,setShowerror] = useState("");

  const navigate = useNavigate()

  const [data,setData] =useState({
    email:"",
    password:"",
  })


  const handlechange =(e)=>{
    setData({...data,[e.target.id]:e.target.value})
    if(data.email.length!==0 && data.password.length!==0){
      setButtondisabler(false)
    }
  }

  const handleSubmit = ()=>{
    fetch(`${url}/login`,{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "content-type":"application/json"
      }
    }).then((res)=>{
      res.json().then((res)=>{
        if(res.message==="User created successfully"){
          navigate("/")
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
    <CssBaseline />
    <Container maxWidth="sm" style={{marginTop:"15vh"}}>
    {showAlert && <><Alert severity="error">{showError}</Alert> <br /></>} 
      <TextField  onChange={handlechange} id="email" label="Email" variant="outlined" />
      <br/><br/>
        <TextField onChange={handlechange} id="password" label="Password" variant="outlined" />
        <br/><br/>
        <Button disabled={buttonDisabler} onClick={handleSubmit} variant="contained" size ="large">Log In </Button>
    </Container>
  </React.Fragment>
    

  )
}

export default Login