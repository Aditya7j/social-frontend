import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const navigate = useNavigate();
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          SOCIAL-MEDIA
        </Typography>
        <Divider />
        <List>
          <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={"Sign Up"} />
              </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={"Sign In"} />
              </ListItemButton>
            </ListItem>
        </List>
      </Box>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              SOCIAL-MEDIA
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              
              <Button onClick={()=>{navigate("/register")}}  sx={{ color: '#fff' }}>{"Sign Up"}</Button>
              <Button onClick={()=>{navigate("/login")}}  sx={{ color: '#fff' }}>{"Sign In"}</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  
  Navbar.propTypes = {
    window: PropTypes.func,
  };

export default Navbar