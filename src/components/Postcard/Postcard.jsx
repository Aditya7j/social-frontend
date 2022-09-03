import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import { useState,useEffect } from 'react';
import axios from "axios"
import { url } from '../../Url/url';





const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  
  

const Postcard = ({userId}) => {
    const [showComment,setShowcomment] = useState(false);

    const [expanded, setExpanded] = React.useState(false);
    const [allPost,setAllpost] = useState([]);

   
  


    const getPost =()=>{
      axios.get(`${url}/feed`).then((res)=>{
        console.log(res.data)
        setAllpost(res.data)
      })
    }
    
    useEffect(()=>{
      getPost()
     
    },[])

    

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleLike =()=>{
      axios.post(`${url}/like`,userId).then((res)=>{
          
      })
    }


  
    return (
      <Card sx={{ maxWidth: "75%"}} style={{margin:"auto"}}>
        {allPost.map((e)=>(
          <>
            <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={e.text}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="400"
          image="https://static.remove.bg/remove-bg-web/45b4adb99db629ba364dd1649ab6e33dfec34929/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           {e.text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Box></Box>
          <IconButton aria-label="add to favorites">
            
            <ThumbUpOffAltIcon onClick={handleLike} />
          </IconButton>
          <Box>0</Box>
          <IconButton aria-label="share">
            <CommentIcon onClick={()=>setShowcomment(!showComment)} />
          </IconButton>
          <Box>0</Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
            
          </ExpandMore>
        </CardActions>

        {showComment && <Box>
            <Box> 
                <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          
          
          title={e.text}
          subheader="Shrimp and Chorizo Paella"
          
          />
                
            </Box>
        </Box>}

          </>
        ))}
        
        
        
        
        
      </Card>
    );
  }
  
  


export default Postcard