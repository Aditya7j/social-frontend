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
import Avatar from '@mui/material/Avatar';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store)=>{
    return store.user
  })
  const [buttonDisabler,setButtondisabler] =useState(true);
  const [data,setData] = useState([]);
  const [showImage,setShowimage] = useState(undefined);

  const [profileData,setProfiledata] = useState("");
  const [userId,setUserid] = useState("");

  


  const [postData,setpostData] = useState({
    text:"",
    profile_pic:showImage,
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

  const handleChangefile =(e)=>{
    setShowimage(e.target.files[0])
    
  }

  const handlePost = (e)=>{
    //console.log(showImage)
    e.preventDefault();
    const formData = new FormData();
    formData.append("text",postData.text)
    formData.append("profile_pic",showImage)
    formData.append("user_id",postData.user_id)
    console.log(formData)
    console.log(postData)
    // fetch(`${url}/feed`,{
    //   method:"POST",
    //   body:JSON.stringify(postData),
    //   headers:{
    //     "content-type":"application/json"
    //   }
    // }).then((res)=>{
    //   //console.log(res.body)

    //   res.json().then((res)=>{
    //     console.log(res.text)

    //     //alert("Post Success")
    //   }).catch((err)=>{
    //     console.log(err.message)
    //   })
    // })
    axios.post(`${url}/feed`,formData).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err.message)
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
          setpostData({...postData,user_id:res?.user?._id})
          setUserid(res?.user?._id)
          setProfiledata(`${res.user.firstName} ${res.user.lastName}`)
        })
      })
     
  }

  useEffect(()=>{
    if(!token){
      navigate("/register")
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
      //console.log(res.data)
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
              <div key={e.id} style={{borderBottom:"1px solid gray"}}>
              <span style={{fontSize:"1.3em",fontWeight:"400",lineHeight:"3",marginLeft:"1vh"}}>{e.firstName}</span>  
              <span style={{fontSize:"1.3em",fontWeight:"400"}}> {e.lastName}</span> 
              </div>
              
              </>
            ))}
            
          </Box1>
          <Box1 style={{ width:"50%",height:"100vh"}}>
            <Box>

        <form onSubmit={handlePost}>
          <TextField
          id="text"
          label="What's in your mind"
          multiline
          rows={5}
          fullWidth={true}
          variant="filled"
          onChange={handleChange}
      
        />
        <TextField id="profile_pic"  variant="outlined"  type="file" onChange={handleChangefile} />
        <Box style={{display:"flex",justifyContent:"flex-end",marginBottom:"5vh"}}>
        <Button onClick={handlePost}  disabled={buttonDisabler} variant="text" align="right">POST</Button>
        </Box>
              </form>
          

        
          
            </Box>

            <Postcard userId={userId}/>


          </Box1>
            <Box1 style={{ width:"21%",height:"100vh"}}>
            <Box style={{width:"100%",height:"25%",border:"1px solid gray",borderRadius:"7px"}}></Box>
            <Box style={{width:"80px",height:"80px",marginTop:"-35px",marginLeft:"15vh",borderRadius:"5px"}}>
            <Avatar style={{width:"100%",height:"100%"}} src="/broken-image.jpg" />
            </Box>
            <span style={{marginLeft:"14vh",fontWeight:"900",color:"#000"}}>{profileData}</span>
            <br /><br />
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

