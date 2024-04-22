
"use client";
import { Height } from "@mui/icons-material";
import { Checkbox, FormControlLabel, Link, TextField, Button } from "@mui/material";
import { useEffect, useState } from 'react';


export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const dynamicWidth = Math.min(windowWidth * 0.5, 400)*1.5;
  const dynamicHeight = Math.min(windowHeight * 0.5, 500)*1.5;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#d0e9f4', 
    },
    formContainer: {
      backgroundColor: 'white', 
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: `${dynamicWidth}px`, 
      height: `${dynamicHeight}px`,
      boxSizing: 'border-box',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
    },
    title: {
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif', 
      fontSize: '50px', 
      color: '#0a7bab', 
    },
    textField: {
      margin: '30px 0',
      width: '100%', 
    },
    button: {
      marginTop: '90px',
      backgroundColor: '#8a9499', 
      color: 'white', 
      padding: '10px 0', 
      borderRadius: '5px', 
      textTransform: 'none', 
      fontWeight: 'bold',
      fontSize: '20px' 
    },
    link: {
      marginTop: '20px',
      textAlign: 'center',
      color: '#1877f2', 
    },
    formOptions: {
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      width: '100%',
      alignSelf: 'flex-start' 
    },
    checkboxFormControl: {
      justifyContent: 'flex-start', 
      width: 'auto',
      alignSelf: 'flex-start'
    },
    forgotLink: {
      color: 'rgba(0, 0, 0, 0.9)',
      alignSelf: 'flex-start', 
      paddingTop: '18px', 
      fontSize: '0.9rem',
 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Blind Match</h2>
        <TextField
          style={styles.textField}
          label="E-mail"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={styles.textField}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={styles.formOptions}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
            style={styles.checkboxFormControl}
          />
          <Link href="/forgot-password" style={styles.forgotLink} underline="always">
            Forgot Password?
          </Link>
        </div>
        <Button style={styles.button} variant="contained" fullWidth>
          Sign In
        </Button>
        <Link href="/profile/signup" style={styles.link} underline="always">
          Don't Have an Account? Sign Up
        </Link>
      </div>
    </div>
  );
}
