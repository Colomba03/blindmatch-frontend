"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Box, Typography, List, ListItem, ListItemText, Divider, AppBar, Toolbar, IconButton, Button, MenuItem, FormControl, Select } from '@mui/material';
import { Drawer, Link, TextField } from "@mui/material";
import Image from 'next/image';
import logoImg from '../assests/logo.png';
import { NavBar } from '../../../components/navbar';
import { ListItemButton, ListItemIcon } from '@mui/material';
import { Mail as MailIcon, AccountCircle as AccountCircleIcon, Explore as ExploreIcon, JoinInner as JoinInnerIcon, Diversity2 as Diversity2Icon, Settings as SettingsIcon, MoreVert as MoreVertIcon, Menu as MenuIcon } from '@mui/icons-material';
import Cookies from 'js-cookie';


function getUserIdFromCookie() {
  return Cookies.get('userId');
}

async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://blindmatch-c7791e88ce1f.herokuapp.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}


function fetchUserPosts(userId) {
  
}

export default function UserPage() {
  const styles = {
    container: {
      display: "flex",
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
      height: "50pc"
    },
    bar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      borderBottom: "solid",
      borderColor: "#6F0778",
      width: "100%",
      height: 55,
      backgroundColor: "#EDAAF3"
    }
  };

  const navigateToPage = (page) => {
    const routes = {
      'Profile': '../pages/profile',
      'Blind': '../pages/blind',
      'Match': '../pages/match',
      'Community': '../pages/community',
      'Settings': '../pages/settings' 
    };
    return () => router.push(routes[page]);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {['Profile', 'Blind', 'Match', 'Community', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={navigateToPage(text)}>
              <ListItemIcon>
                {
                  {
                    'Profile': <AccountCircleIcon />,
                    'Blind': <ExploreIcon />,
                    'Match': <JoinInnerIcon />,
                    'Community': <Diversity2Icon />,
                    'Settings': <SettingsIcon />
                  }[text]
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  // user data placeholder
  /*const userData = {
    username: "asmith",
    birthday: "1985-10-20",
    sex: "female"
  };*/

  useEffect(() => {
    const userId = getUserIdFromCookie();
    if (userId) {
      fetchUserData(userId)
        .then(userData => {
          if (userData) {
            setUserData(userData);
          } 
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: 'solid 1px #6F0778',
        backgroundColor: '#d0e9f4',
        height: '65px'
      }}>
        <IconButton onClick={() => setOpen(true)} style={{ position: 'absolute', left: 10 }}>
          <MenuIcon style={{ fontSize: '50px' }} />
        </IconButton>
        <Image src={logoImg} alt="Logo" width={110} height={45} objectFit="fill" />
        <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
          {list()}
        </Drawer>
      </div>
  
      <div style={styles.container}>
        <Box mt={2} style={{ textAlign: "center" }}>
          <Avatar alt="User Photo" src="" sx={{ width: 100, height: 100 }} />
        </Box>
  
        {/* User information */}
        <Box textAlign="center" mt={2}>
          <Typography variant="h4" style={{ color: 'black' }}>{userData?.username}</Typography>
          <Typography variant="body1" style={{ color: 'black' }}>Birthdate: {userData?.birthdate}</Typography>
          <Typography variant="body1" style={{ color: 'black' }}>Sex: {userData?.sex}</Typography>
        </Box>
  
        {/*user posts */}
        <Box mt={2}>
          <Typography variant="h5" style={{ color: "black" }}>My Posts</Typography>
          <List>
            {/*list of posts*/}
          </List>
        </Box>
  
      
      </div>
    </>
  );
  
  
}
