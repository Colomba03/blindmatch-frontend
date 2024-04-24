"use client";
import { useEffect, useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const dynamicWidth = Math.min(windowWidth * 0.8, 400);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#d0e9f4',
    },
    paper: {
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: `${dynamicWidth}px`, 
      height: `95%`, 
      boxSizing: 'border-box', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      marginBottom: '20px',
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#0a7bab',
    },
    textField: {
      margin: '5px 0',
      width: '100%',
    },
    button: {
      marginTop: '10px',
      backgroundColor: '#8a9499',
      color: 'white',
      padding: '10px 0',
      borderRadius: '5px',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the email submission logic here
  };

  return (
    <div style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
        <form onSubmit={handleSubmit}>
          <h2 style={styles.title}>Reset your password</h2>
          <TextField
            style={styles.textField}
            label="E-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={styles.textField}
            label="Confirm email"
            variant="outlined"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <Button type="submit" style={styles.button} variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}