
"use client";
import { Height } from "@mui/icons-material";
import { Checkbox, FormControlLabel, Link, TextField, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logoImg from '../assests/logo.png';

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
  
  const dynamicWidth = windowWidth*0.75

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '5px',
      backgroundColor: '#d0e9f4', 
      overflow: 'auto'
    },
    formContainer: {
      backgroundColor: 'white', 
      padding: '25px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: `${dynamicWidth}px`, 
      height: `85%`,
      boxSizing: 'border-box',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'space-between',
      
    },
    imageTitle: {
      width: 'auto',
      height: 'auto' 
    },
    textField: {
      margin: '4px',
      width: '100%', 
      boxSizing: 'border-box',
      borderRadius: '5px', 
    },
    button: {
      marginTop: '5px',
      backgroundColor: '#8a9499', 
      color: 'white', 
      padding: '10px 0', 
      borderRadius: '5px', 
      textTransform: 'none', 
      fontWeight: 'bold',
      fontSize: '15px' 
    },
    link: {
      marginTop: '5px',
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
      paddingTop: '5px', 
      fontSize: '0.9rem',
 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
      <Image src={logoImg} alt="Blind Match Logo" style={styles.imageTitle} />
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
          Log In
        </Button>
        <Link href="/profile/signup" style={styles.link} underline="always">
          Don't Have an Account? Sign Up
        </Link>
      </div>
    </div>
  );
}
