import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomBox = styled(Box)(() => ({
  background: 'linear-gradient(135deg, #edf2ff, #e1e4ff)',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
}));

const AdoLogin = () => {
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

    // Check for admin credentials
    if (email === "admin@gmail.com" && password === "admin") {
      alert("Admin login successful");
      navigate("/viewclients");
      setLoading(false); // Stop loading
      return; // Stop further execution after admin login
    }

    try {
      console.log('Sending login request');
      const response = await fetch('http://localhost:5000/api/advocateLogin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (response.ok) {
        console.log('Login successful, storing token');
        localStorage.setItem('token', data.token);

        // Check user role and navigate accordingly
        localStorage.setItem("advocate", JSON.stringify(data.advocate));
        if (data.role === 'admin') {
          navigate('/admin/dashboard'); // Admin dashboard route
        } else {
          navigate('/ownprofile', { state: { advocate: data.advocate } });
        }
      } else {
        console.error('Login failed: ', data.message);
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
      <CustomBox>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Advocate Login
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
          Don't have an account? <a href="/signup/advocate">Sign up</a>
        </Typography>
      </CustomBox>
    </Container>
  );
};

export default AdoLogin;
