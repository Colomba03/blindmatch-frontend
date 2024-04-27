"use client";
import { Button, Drawer, Link, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import logoImg from '../../assests/logo.png';
// import {NavBar} from "../../../components/navbar.js";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
// import styles from "../login.module.css";

export default function CommunityPage() {
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
        {['Profile', 'Blind', 'Match','Community', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text == 'Profile' ? (<AccountCircleIcon onClick={() => router.push()}/>)
                :(
                <>
                    {text == 'Blind' ? (<ExploreIcon />):(
                    <>
                        {text == 'Match' ? (<JoinInnerIcon />):(
                            <>
                                {text == 'Community' ? (<Diversity2Icon />):(<SettingsIcon />)}
                            </>
                        )}
                    </>
                    )}
                </>
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Box>
  );
  const [open,setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
        <div style={styles.bar}>
        <MenuIcon style={{fontSize:"50px"}} onClick={()=>setOpen(true)} />
        <Drawer
            anchor={'left'}
            open={open}
            onClose={()=>setOpen(false)}
        >
            {list('left')}
        </Drawer>
        </div>
        <div style={styles.container}>
        <h2 style={{ color: "black", marginTop:150 }}>Community Page</h2>
        </div>
    </>
  );
}
