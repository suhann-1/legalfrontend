import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { json, useNavigate } from 'react-router-dom';

const CustomBox = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #edf2ff, #e1e4ff)',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
}));

const ClLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Both fields are required!');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending login request'); // Debugging log
      const response = await fetch('http://localhost:5000/api/clientlogin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      localStorage.setItem("client", JSON.stringify(data.client));
      console.log('Response from server:', data); // Debugging log

      if (response.ok) {
        console.log('Login successful, storing token'); // Debugging log
        // Store JWT token in localStorage
        localStorage.setItem('token', data.token);

        // Redirect to the advocate profiles page
        navigate('/clientownprofile');
      } else {
        console.error('Login failed: ', data.message); // Debugging log
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('An error occurred:', err); // Debugging log
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <CustomBox>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Client Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              mt: 2,
              mb: 2,
              padding: '10px',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#303f9f' },
            }}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </Button>
        </form>
        <Typography variant="body2" sx={{ my: 2 }}>
          Don't have an account? <a href="/signup/client">Sign up</a>
        </Typography>
      </CustomBox>
    </Container>
  );
};

export default ClLogin;
