import * as React from 'react';
import Box from '@mui/material/Box';
import Box1 from '@mui/material/Box';
import Homenav from '../HomeNav/Homenav';
import Postcard from '../Postcard/Postcard';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { url } from '../../Url/url';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../Redux/action';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store)=>{
    return store.user
  })
  const [buttonDisabler,setButtondisabler] =useState(true);
  const [data,setData] = useState([]);


  const [postData,setpostData] = useState({
    text:"",
    profile_pic:"",
    user_id: ""
  })

  const handleChange = (e)=>{
    setpostData({...postData,[e.target.id]:e.target.value})
    if(postData.text.length===0 && postData.profile_pic.length===0){
      setButtondisabler(true)
    }
    else{
      setButtondisabler(false)
    }
    
  }

  const handlePost = ()=>{
    // fetch(`${url}/feed`,{
    //   method:"POST",
    //   body:JSON.stringify(postData),
    //   headers:{
    //     "content-type":"application/json"
    //   }
    // }).then((res)=>{
    //   //console.log(res.body)
    //   res.json().then((res)=>{
    //     //console.log(res.text)
    //     //alert("Post Success")
    //   }).catch((err)=>{
    //     console.log(err.message)
    //   })
    // })
    axios.post(`${url}/feed`).then((res)=>{
      console.log(res)
    })
  }


  

//console.log(token)
  

  const fetchUser =()=>{
      fetch(`${url}/register/auth`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }).then((res)=>{
       // console.log(res)
        res.json().then((res)=>{
          //console.log(res)
          
          dispatch(addUser(res.user))
          setpostData({...postData,user_id:res.user._id})
        })
      })
     
  }

  useEffect(()=>{
    if(!token){
      //navigate("/register")
      //line 92 important
    }
    else{
     
      fetchUser()
      getUser()
      //console.log(token)
      
      
    }   
  },[])

  const getUser = ()=>{
    axios.get(`${url}/register`).then((res)=>{
      console.log(res.data)
      setData(res.data)
    })
  }


  return (
    <>
    <Homenav/>
      <Box style={{display:"flex",width: "100%",height: "100vh",
      justifyContent:"space-evenly"}}>
          <Box1 style={{ width:"20%",height:"100vh"}}>
          <h2>Freinds Online 
            <b style={{color:"green",fontWeight:"900",fontSize:"2em"}}>  .</b>
           </h2> <hr />
            {data.map((e)=>(
              <>
              <div style={{borderBottom:"1px solid gray"}}>
              <span style={{fontSize:"1.3em",fontWeight:"400",lineHeight:"3",marginLeft:"1vh"}}>{e.firstName}</span>  
              <span style={{fontSize:"1.3em",fontWeight:"400"}}> {e.lastName}</span> 
              </div>
              
              </>
            ))}
            
          </Box1>
          <Box1 style={{ width:"50%",height:"100vh"}}>
            <Box>
            <TextField
          id="text"
          label="What's in your mind"
          multiline
          rows={5}
          fullWidth={true}
          variant="filled"
          onChange={handleChange}
      
        />
        <TextField id="profile_pic"  variant="outlined"  type="file" onChange={handleChange} />
        <Box style={{display:"flex",justifyContent:"flex-end",marginBottom:"5vh"}}>
        <Button onClick={handlePost}  disabled={buttonDisabler} variant="text" align="right">POST</Button>
        </Box>
          
            </Box>
            <Postcard/>
          </Box1>
            <Box1 style={{ width:"21%",height:"100vh"}}>
            <Box style={{width:"100%",height:"25%",border:"1px solid gray",borderRadius:"7px"}}></Box>
            <Box style={{width:"80px",height:"80px",border:"1px solid red",marginTop:"-15px",marginLeft:"15vh",borderRadius:"5px"}}></Box>
            <h4 style={{marginLeft:"14vh",fontWeight:"900",color:"#000"}}>Aditya Kumar</h4>
            <br />
            <TextField
          id="text"
          label="What do you Think"
          multiline
          rows={3}
          fullWidth={true}
          variant="filled"
          onChange={handleChange}
      
        />
          </Box1>
      </Box>
      
    
    </>
   
  )
}

export default Home