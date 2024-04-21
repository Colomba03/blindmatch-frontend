"use client";
import { Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
// import styles from "../login.module.css";

export default function NavBar() {
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
  const [open,setOpen] = useState(false);
  // const router = useRouter();
  return (
    <div style={styles.container}>
      <h2 style={{ color: "black", marginTop: 150 }}>BlindMatch</h2>
      <Button onClick={()=>setOpen(true)}>Menu</Button>
      <Drawer
        anchor={'left'}
        open={open}
        onClose={()=>setOpen(false)}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
