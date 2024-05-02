"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {Button,Drawer,TextField,Card,CardContent,Typography,Accordion,AccordionSummary,AccordionDetails,Box,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import logoImg from '../../assests/logo.png';
import { getCookie } from 'cookies-next';
// import styles from "../login.module.css";

export default function BlindPage() {
  // console.log(styles);
  const styles = {
    container: {
      display: "flex",
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
      height: "50pc"
    },
    bar: {
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-start",
        borderBottom:"solid",
        borderColor:"#6F0778",
        width:"100%",
        height:55,
        backgroundColor: "#EDAAF3"
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={()=>setOpen(true)}
      onKeyDown={()=>setOpen(true)}
    >
      <List>
        {['Profile', 'Match', 'Log Out'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text == 'Profile' ? (<AccountCircleIcon />)
                :(
                <>
                    {text == 'Blind' ? (<ExploreIcon />):(
                    <>
                        {text == 'Match' ? (<JoinInnerIcon />):(
                            <>
                                {text == 'Community' ? (<Diversity2Icon />):(<LogoutIcon />)}
                            </>
                        )}
                    </>
                    )}
                </>
                )}
              </ListItemIcon>
              <ListItemText primary={text}
                onClick={text == 'Profile' ? (() => router.push('../pages/profile'))
                :(
                    text == 'Blind' ? (() => router.push('../pages/blind')):(
                    text == 'Match' ? (() => router.push('../feed')):(
                            text == 'Community' ? (() => router.push('../pages/community'))
                                :(() => {
                                  deleteCookie('user_id');
                                  router.push('../profile');
                                })
                        )
                    )
                
                )} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Box>
  );
  useEffect(() => {
    const userId = getCookie('user_id');
    console.log(userId);
    if (userId) {
      const fetchPosts = () => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/posts/except/${userId}`)
          .then(response => {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              return response.json();
            } else {
              return response.text();
            }
          })
          .then(data => {
            console.log(data);
            if (typeof data === 'string' && data.includes("No related posts found")) {
              setPosts([]);
            } else if (data && Array.isArray(data)) {
              setPosts(data);
            } else {
              setPosts([]); 
            }
          })
          .catch(error => {
            console.error('Error fetching posts:', error.message);
            setPosts([]); 
          });
      };
      fetchPosts();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = getCookie('user_id');
    const newPost = { userId, title, content };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/posts`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
    } catch (error) {
      console.error('Error posting new data:', error);
    }
  }
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expanded, setExpanded] = useState(false);
  return (
    <>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: 'solid 1px #6F0778',
        backgroundColor: '#5ab2d8',
        height: '65px'
      }}>
        <IconButton onClick={() => setOpen(true)} style={{ position: 'absolute', left: 10 }}>
          <MenuIcon style={{ fontSize: '50px' }} />
        </IconButton>
        <Image src={logoImg} alt="Logo" width={110} height={45} objectFit="contain" />
        <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
          {list()}
        </Drawer>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2, width: '100%', bgcolor: '#d0e9f4', minHeight: '100vh' }}>
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Create A New Post</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" fullWidth margin="normal" />
              <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} multiline rows={4} variant="outlined" fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, backgroundColor: 'lightgrey', color: 'black', '&:hover': { backgroundColor: 'grey' }}}>Submit</Button>
            </form>
          </AccordionDetails>
        </Accordion>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: '#d0e9f4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {posts.length > 0 ? (
            posts.map(post => (
              <ListItem key={post.id} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ width: '100%', maxWidth: 600 }}>
                  <CardContent>
                        <Typography variant="h6">{post.username}</Typography>
                        <Typography variant="suntitle1">{post.title}</Typography>
                        <Typography variant="body2">{post.content}</Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))
          ) : (
            <Typography sx={{ mt: 2 }}>No related posts found</Typography>
          )}
        </List>
      </Box>
    </>
  );
}
