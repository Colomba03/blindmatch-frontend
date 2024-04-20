"use client";
import { Button, Drawer, Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import {NavBar} from "../../../components/navbar.js";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
// import styles from "../login.module.css";

export default function HomePage() {
  // console.log(styles);
  const styles = {
    container: {
      display: "flex",
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
      height: "50pc"
    },
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={()=>setOpen(true)}
      onKeyDown={()=>setOpen(true)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Box>
  );
  const [open,setOpen] = useState(false);
  // const router = useRouter();
  return (
    <div style={styles.container}>
      <h2 style={{ color: "black", marginTop:150 }}>Log In</h2>
      <Button onClick={()=>setOpen(true)}>Menu</Button>
      <Drawer
        anchor={'left'}
        open={open}
        onClose={()=>setOpen(false)}
      >
        {list('left')}
      </Drawer>
      <Link href="/profile/signup" underline="always">
        Dont have an account? Sign Up
      </Link>
    </div>
  );
}
