"use client";
import { Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
// import styles from "../login.module.css";

export default function ProfilePage() {
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();
  return (
    <div style={styles.container}>
      <h2 style={{ color: "black", marginTop:150 }}>Log In</h2>
      <TextField
        id="standard-basic"
        sx={{ width: 300 }}
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
      />
      <TextField
        id="standard-basic"
        sx={{ width: 300 }}
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
      />
      <button onClick={() => console.log(username, password)}>Log In</button>
      <Link href="/profile/signup" underline="always">
        Dont have an account? Sign Up
      </Link>
    </div>
  );
}
