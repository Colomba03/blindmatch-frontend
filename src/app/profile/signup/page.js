"use client";
import { Button, Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SignUpPage() {
  const styles = {
    container: {
      display: "flex",
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
      height: "50pc",
    },
  };
  const [page,setPage] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();
  return (
    <div style={styles.container}>
      <h2 style={{ color: "black", marginTop: 50 }}>Sign Up</h2>
      <TextField
        id="standard-basic"
        sx={{ width: 300 }}
        label="Email"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
      />
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
      />
      <TextField
        id="standard-basic"
        sx={{ width: 300 }}
        label="Confirm Password"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
      />
      <TextField
        id="standard-basic"
        sx={{ width: 300 }}
        label="First Name"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
      />
      <TextField
        id="standard-basic"
        sx={{ width: 300 }}
        label="Last Name"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        size="small"
      />
      <label style={{color:"gray",marginTop:5}}>Birthday</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
      <Button variant="contained" onClick={() => {}}>Next</Button>
    </div>
  );
}
